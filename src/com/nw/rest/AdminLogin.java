package com.nw.rest;

import java.net.URI;
import java.net.URISyntaxException;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

public class AdminLogin {

    @POST
    @Path("/admin")
    public Response checkDetails(@FormParam("name") String name,@FormParam("pass") String pass ) throws URISyntaxException  {

        URI uri = new URI("/login/success");
        URI uri2= new URI("http://localhost:9090/NewWebServiceproject/new/login/failure");

        if(name.equals("admin") && pass.equals("pass"))
    //@Path("http://localhost:8010/NewWebServiceproject/new/login/success");
            {
            return Response.temporaryRedirect(uri).build();
            //Response.seeOther(uri);
            //return Response.status(200).entity("user successfully login").build();
            }
        else
        {
            return Response.temporaryRedirect(uri2).build();
            //Response.seeOther(uri2);
            //return Response.status(200).entity("user logon failed").build();
            }
    }
    @POST
    @Path("/success")
    public Response successpage()
    {
    return Response.status(200).entity("user successfully login").build();
    }
    @POST
    @Path("/failure")
    public Response failurepage()
    {
    return Response.status(200).entity("user logon failed").build();
    }
}