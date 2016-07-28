package com.arctic.boosetube;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import net.sf.ehcache.CacheManager;

public class BooseTubeContextListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		CacheManager.getInstance().shutdown();
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		// create content cache
		CacheManager.getInstance().addCache("content");
	}

}
