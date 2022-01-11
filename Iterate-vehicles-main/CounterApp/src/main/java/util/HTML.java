package util;

import java.io.PrintWriter;

import java.util.List;

import data.Info;

public class HTML {
	public static void printStart(PrintWriter out) {
		out.println("<!DOCTYPE html><html><head><title>FishList</title></head><body>");
	}

	public static void printEnd(PrintWriter out) {
		out.println("</body></html>");
	}
	public static void printTable(PrintWriter out, List<Info> infolist) {
		
		out.println("<h1>Fished fish</h1>");
		out.println("<table border='1'>");
		for (int i=0;i<infolist.size();i++) {
			Info f=infolist.get(i);
			out.println("<tr><td>"+f.getId()+"<td>"+f.getCar());
		}
		out.println("</table>");
		out.println("<div id='loginout'>Log In Out</div>");
//		out.println("<a href='./index.html'>Back to form</a>");
	}
	
}
