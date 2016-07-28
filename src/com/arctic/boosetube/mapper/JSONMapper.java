package com.arctic.boosetube.mapper;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class JSONMapper {
	private final static DateFormat contentDateFormat = new SimpleDateFormat("MMMM d, yyyy h:mm a");
	
	public static JSONObject map(DBObject dbRecord) {
		JSONObject json = new JSONObject();
		for (String key : dbRecord.keySet()) {
			json.put(key, dbRecord.get(key));
		}
		ObjectId oid = new ObjectId(dbRecord.get("_id").toString());
		json.put("timestamp", contentDateFormat.format(new Date(oid.getTime())));
		return json;
	}

	public static JSONArray map(DBCursor dbCursor) {
		JSONArray result = new JSONArray();
		while (dbCursor.hasNext()) {
			DBObject record = dbCursor.next();
			result.put(map(record));
		}

		return result;
	}

	public static DBObject mapToDBObject(JSONObject json) {
		DBObject dbObject = new BasicDBObject();
		for (Object oKey : json.keySet()) {
			String key = (String) oKey;
			dbObject.put(key, json.get(key));
		}
		return dbObject;
	}
}
