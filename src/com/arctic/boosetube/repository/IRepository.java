package com.arctic.boosetube.repository;

import org.json.JSONArray;
import org.json.JSONObject;

import com.mongodb.DBObject;

public interface IRepository {
	JSONObject read(String id);

	JSONArray readAll();

	JSONArray read(DBObject query);

	String create(DBObject object);

	boolean delete(String id);
}
