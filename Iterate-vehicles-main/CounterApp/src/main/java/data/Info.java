package data;


public class Info {
	private int id;

	private int car;

	private int bus;
	private int trucks;

	private int motorcycles;
	private String sessionId;
	private int userId;
	private String date;
	private float longitude;
	private float latitude;
	private String Timer;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	/**
	 * @return the car
	 */
	public int getCar() {
		return car;
	}
	/**
	 * @param car the car to set
	 */
	public void setCar(int car) {
		this.car = car;
	}
	public void setCar(String s) {
		try {
			this.car = Integer.parseInt(s);
		}
		catch(NumberFormatException e) {
			car=-1;
		}
	}
	/**
	 * @return the bus
	 */
	public int getBus() {
		return bus;
	}
	/**
	 * @param bus the bus to set
	 */
	public void setBus(int bus) {
		this.bus = bus;
	}
	public void setBus(String s) {
		try {
			this.bus = Integer.parseInt(s);
		}
		catch(NumberFormatException e) {
			bus=-1;
		}
	}
	/**
	 * @return the trucks
	 */
	public int getTrucks() {
		return trucks;
	}
	/**
	 * @param trucks the trucks to set
	 */
	public void setTrucks(int trucks) {
		this.trucks = trucks;
	}
	public void setTrucks(String s) {
		try {
			this.trucks = Integer.parseInt(s);
		}
		catch(NumberFormatException e) {
			trucks=-1;
		}
	}
	/**
	 * @return the motorcycles
	 */
	public int getMotorcycles() {
		return motorcycles;
	}
	/**
	 * @param motorcycles the motorcycles to set
	 */
	public void setMotorcycles(int motorcycles) {
		this.motorcycles = motorcycles;
	}
	public void setMotorcycles(String s) {
		try {
			this.motorcycles = Integer.parseInt(s);
		}
		catch(NumberFormatException e) {
			motorcycles=-1;
		}
	}
	/**
	 * @return the sessionId
	 */
	public String getSessionId() {
		return sessionId;
	}
	/**
	 * @param sessionId the sessionId to set
	 */
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	
	/**
	 * @return the userId
	 */
	public int getUserId() {
		return userId;
	}
	/**
	 * @param userId the userId to set
	 */
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public void setUserId(String s) {
		try {
			this.userId = Integer.parseInt(s);
		}
		catch(NumberFormatException e) {
			userId=-1;
		}
	}
	/**
	 * @return the date
	 */
	public String getDate() {
		return date;
	}
	/**
	 * @param date the date to set
	 */
	public void setDate(String date) {
		this.date = date;
	}
	/**
	 * @return the longitude
	 */
	public float getLongitude() {
		return longitude;
	}
	/**
	 * @param longitude the longitude to set
	 */
	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}
	public void setLongitude(String s) {
		try {
			this.longitude = Float.parseFloat(s);
		}
		catch(NumberFormatException e) {
			longitude=-1;
		}
	}
	/**
	 * @return the latitude
	 */
	public float getLatitude() {
		return latitude;
	}
	/**
	 * @param latitude the latitude to set
	 */
	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}
	public void setLatitude(String s) {
		try {
			this.latitude = Float.parseFloat(s);
		}
		catch(NumberFormatException e) {
			latitude=-1;
		}
	}
	/**
	 * @return the timer
	 */
	public String getTimer() {
		return Timer;
	}
	/**
	 * @param timer the timer to set
	 */
	public void setTimer(String timer) {
		Timer = timer;
	}
}
	