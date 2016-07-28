package com.arctic.boosetube.resource;

import java.io.File;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.arctic.boosetube.service.ConfigurationService;

@Path("/file")
public class FileResource {

	private static String fileUploadPath = null;
	private static String thumbUploadPath = null;

	public FileResource() {
		ConfigurationService configService = new ConfigurationService();
		fileUploadPath = configService.getString("file-upload.path");
		thumbUploadPath = configService.getString("file-upload.thumb-path");
	}

	@GET
	@Path("/{filename}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getFile(@PathParam("filename") final String fileName) {

		if (fileName == null || fileName.isEmpty())
			return Response.status(Response.Status.BAD_REQUEST).build();

		File file = new File(fileUploadPath, fileName);
		return Response.ok(file).build();
	}
}
