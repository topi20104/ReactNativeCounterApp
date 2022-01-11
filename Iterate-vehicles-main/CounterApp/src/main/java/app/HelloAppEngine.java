package app;

import java.io.IOException;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.utils.SystemProperty;

import conn.Connections;

import data.Info;

@WebServlet(
    name = "HelloAppEngine",
    urlPatterns = {"/hello"}
)
public class HelloAppEngine extends HttpServlet {

  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

public void doPost(HttpServletRequest request, HttpServletResponse response) 
	      throws IOException {
	  doGet(request, response);
  }
  
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) 
      throws IOException {
	    response.setContentType("text/html");
	    response.setCharacterEncoding("UTF-8");
	    PrintWriter out=response.getWriter();
	    
	    ArrayList<Info> infolist=new ArrayList<>();
		util.HTML.printStart(out);
	    Connection conn=null;
	    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
	    	out.println("Production version");
	    	try {
				conn=Connections.getProductionConnection();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    }
	    else {    
	    	out.println("Development version");
			try {
				conn=Connections.getDevConnection();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    }
	    try {
	    	if (conn!=null) {
				Statement stmt=conn.createStatement();
				ResultSet RS=stmt.executeQuery("select * from fish");
				
				while (RS.next()) {
					Info f=new Info();
					f.setId(RS.getInt("id"));

					f.setCar(RS.getInt("car"));

					f.setBus(RS.getInt("bus"));
					f.setTrucks(RS.getInt("trucks"));

					f.setMotorcycles(RS.getInt("motorcycles"));
					f.setSessionId(RS.getString("SessionID"));
					f.setUserId(RS.getInt("UserID"));
					f.setDate(RS.getString("Date"));
					f.setLongitude(RS.getFloat("longitude"));
					f.setLatitude(RS.getFloat("latitude"));
					infolist.add(f);
				}
				conn.close();
				util.HTML.printTable(out, infolist);
	    	}
	    	else {
	    		out.println("No connection to database!");
	    	}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		util.HTML.printEnd(out);
  }
}