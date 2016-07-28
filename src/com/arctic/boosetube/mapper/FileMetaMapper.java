package com.arctic.boosetube.mapper;

import java.util.Arrays;

import org.bson.types.ObjectId;

import com.arctic.boosetube.model.FileMeta;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;

public class FileMetaMapper {
	public static BasicDBObject map(FileMeta fileMeta) {
		if (fileMeta == null)
			return null;

		BasicDBObject dbo = new BasicDBObject();

		dbo.put("_id", new ObjectId(fileMeta.getId()));
		dbo.put("title", fileMeta.getTitle());
		dbo.put("filepath", fileMeta.getPath());
		dbo.put("description", fileMeta.getDescription());
		dbo.put("keywords",
				new BasicDBList().addAll(Arrays.asList(fileMeta.getKeywords())));
		dbo.put("thumbpath", "");
		dbo.put("rating", 0);
		dbo.put("views", 0);
		dbo.put("attributes", new BasicDBObject());

		String type = "unknown";
		FileMeta.FileType fileType = fileMeta.getType();
		switch (fileType) {
			case Image:
				type = "image";
				break;
			case Video:
				type = "video";
				break;
			case Audio:
				type = "audio";
				break;
			case Unknown:
				type = "unknown";
				break;
		}

		dbo.put("type", type);

		return dbo;
	}
}
