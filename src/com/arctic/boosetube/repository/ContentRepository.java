package com.arctic.boosetube.repository;

import java.net.UnknownHostException;

import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONObject;

import com.arctic.boosetube.mapper.JSONMapper;
import com.arctic.boosetube.service.ConfigurationService;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.WriteResult;

public class ContentRepository implements IRepository {

	private ConfigurationService configService;
	private DBCollection collection = null;

	public ContentRepository() {
		configService = new ConfigurationService();
		if (configService == null) return;
		
		String host = configService.getString("mongodb.host");
		int port = configService.getInteger("mongodb.port");
		String database = configService.getString("mongodb.database");
		System.out.println(host + ":" + port + "/" + database);
		try {
			MongoClient mongoClient = new MongoClient(host, port);
			DB db = mongoClient.getDB("boosetube-prod");
			collection = db.getCollection("content");
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}

	@Override
	public JSONObject read(String id) {
		if (collection == null)
			return null;

		BasicDBObject query = new BasicDBObject("_id", new ObjectId(id));
		DBObject result = collection.findOne(query);

		return JSONMapper.map(result);
	}

	@Override
	public JSONArray readAll() {
		if (collection == null)
			return null;

		DBCursor cursor = collection.find().limit(10);

		return JSONMapper.map(cursor);
	}

	@Override
	public JSONArray read(DBObject query) {
		if (collection == null)
			return null;

		DBCursor cursor = collection.find(query);

		return JSONMapper.map(cursor);
	}

	public String create(DBObject object) {
		if (collection == null)
			return null;
		WriteResult writeResult = collection.insert(object);

		if (!isGoodResult(writeResult))
			return null;
		ObjectId oid = (ObjectId) object.get("_id");
		return oid.toString();
	}

	public boolean delete(String id) {
		if (collection == null)
			return false;
		WriteResult writeResult = collection.remove(new BasicDBObject("_id",
				new ObjectId(id)));

		return isGoodResult(writeResult);
	}

	private boolean isGoodResult(WriteResult writeResult) {
		String error = writeResult.getError();

		if (error != null && !error.isEmpty()) {
			System.out.println(String.format("ContentRepository.create: %",
					error));
			return false;
		}
		return true;
	}
}
