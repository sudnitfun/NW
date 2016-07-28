package com.arctic.boosetube.service;

import java.util.regex.Pattern;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import org.json.JSONArray;
import org.json.JSONObject;

import com.arctic.boosetube.mapper.FileMetaMapper;
import com.arctic.boosetube.mapper.JSONMapper;
import com.arctic.boosetube.model.FileMeta;
import com.arctic.boosetube.repository.ContentRepository;
import com.arctic.boosetube.repository.IRepository;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

public class ContentService {

	private final static Cache contentCache = CacheManager.getInstance()
			.getCache("content");

	public static JSONArray get(String title, String type) {
		String cacheKey = String.format("content_%s_%s", type, title);
		Element cacheElement = contentCache.get(cacheKey);

		if (cacheElement == null) {
			JSONArray json = null;
			if (type.isEmpty() && title.isEmpty()) {
				IRepository repository = new ContentRepository();
				json = repository.readAll();
			} else {
				json = ContentService.findByCriteria(type, title);
			}
			contentCache.put(new Element(cacheKey, json));
			return json;
		} else {
			System.out.println("Retrieved cached element: "
					+ cacheElement.toString());
		}
		JSONArray cacheValue = (JSONArray) cacheElement.getObjectValue();
		return cacheValue;
	}

	public static JSONObject getById(String id) {
		String cacheKey = String.format("content_%s", id);
		Element cacheElement = contentCache.get(cacheKey);

		if (cacheElement == null) {
			IRepository repository = new ContentRepository();
			JSONObject json = repository.read(id);
			contentCache.put(new Element(cacheKey, json));
			return json;
		} else {
			System.out.println("Retrieved cached element: "
					+ cacheElement.toString());
		}

		JSONObject cacheValue = (JSONObject) cacheElement.getObjectValue();
		return cacheValue;
	}

	private static JSONArray findByCriteria(String type, String title) {
		DBObject query = new BasicDBObject();
		if (!type.isEmpty())
			query.put("type", type);
		if (!title.isEmpty())
			query.put("title", Pattern.compile(title));

		IRepository repository = new ContentRepository();
		return repository.read(query);
	}

	public static String createObject(JSONObject json) {
		IRepository repository = new ContentRepository();
		return repository.create(JSONMapper.mapToDBObject(json));
	}

	public static String createObject(FileMeta fileMeta) {
		IRepository repository = new ContentRepository();
		return repository.create(FileMetaMapper.map(fileMeta));
	}

}
