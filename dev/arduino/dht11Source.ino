#include "DHT.h"
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>


#define DHTPIN 2 // what digital pin we're connected to
const char* REDISHOST = "54.237.117.36";
const int REDISPORT = 6379;
#define REDISAUTH "13111999"

//network SSID (name)
#define WIFI_SSID "ptlptn"
#define WIFI_PASS "hanoiamsterdam"

#define DHTTYPE DHT11 // DHT 11

#define NTP_UDP udp
#define NTP_OFFSET 60*60*7
#define NTP_INTERVAL 60*1000
#define NTP_ADDRESS "pool.ntp.org"


DHT dht(DHTPIN, DHTTYPE);
WiFiClient redis;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_ADDRESS, NTP_OFFSET, NTP_INTERVAL);

void setup() {
  Serial.begin(9600);
  Serial.println("DHTxx test!");
  Serial.print("Serial initialized.");
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Waiting for connection");
  }

  Serial.println("");
  Serial.print("WiFi (");
  Serial.print(WiFi.macAddress());
  Serial.print(") connected with IP ");
  Serial.println(WiFi.localIP());
  Serial.print("DNS0 : ");
  Serial.println(WiFi.dnsIP(0));
  Serial.print("DNS1 : ");
  Serial.println(WiFi.dnsIP(1));

  if (!redis.connected()) {
    Serial.print("Redis not connected, connecting...");
    redis.connect(REDISHOST, REDISPORT);
    redis.print(
      String("*2\r\n")
        + "$4\r\n"
        + String("AUTH") + "\r\n"
        + "$" + String(REDISAUTH).length() + "\r\n"
        + String(REDISAUTH) + "\r\n");
        
    if (!redis.connected()) {
      Serial.print("Redis connection failed...");
      Serial.println("Waiting for next read");
      //return;
    } else {
      Serial.println("OK");
    }
  };
  
  dht.begin();
  timeClient.begin();
  //timeClient.setTimeOffset(300600);

}

void loop() {
  // Wait a few seconds between measurements.
   delay(60000);
  timeClient.update();

  //Extract Time and Date to use in Hash
  String formattedTime = timeClient.getFullFormattedTime();
  
  //int splitT = formattedTime.indexOf(" ");
  //String dayStamp = formattedTime.substring(0, splitT);
  //String timeStamp = formattedTime.substring(splitT + 1, formattedTime.length());

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  int h = dht.readHumidity();
  

  // Read temperature as Celsius (the default)
  int t = dht.readTemperature();
 
  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) ) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.print(" *C ");
  Serial.println("");
/*

  Serial.println(String("*4\r\n")
    + "$14\r\n" 
    + "JSON.ARRAPPEND\r\n"
    + "$5\r\n" 
    + "dht11" + "\r\n"
    + "$1\r\n"
    + String(".") + "\r\n"
    + "$80\r\n" 
    + "{" 
    + String("\"Date\":\"") + String(formattedTime) + String("\",") 
    + String("\"AQI\":") + String(92) + String(",")
    + String("\"Humidity\":") + String(h) + String(",") 
    + String("\"Temperature\":") + String(t) 
    + "}"
  );

  Serial.println(String("*4\r\n")
    + "$8\r\n" 
    + "JSON.SET\r\n"
    + "$10\r\n" 
    + "dht11.real" + "\r\n"
    + "$1\r\n"
    + String(".") + "\r\n"
    + "$80\r\n" 
    + "{" 
    + String("\"Date\":\"") + String(formattedTime) + String("\",") 
    + String("\"AQI\":") + String(92) + String(",")
    + String("\"Humidity\":") + String(h) + String(",") 
    + String("\"Temperature\":") + String(t) 
    + "}"
  );
*/
  redis.println(String("*4\r\n")
    + "$14\r\n" 
    + "JSON.ARRAPPEND\r\n"
    + "$11\r\n" 
    + "dht11.graph" + "\r\n"
    + "$1\r\n"
    + String(".") + "\r\n"
    + "$70\r\n" 
    + "{" 
    + String("\"Date\":\"") + String(formattedTime) + String("\",") 
    + String("\"AQI\":") + String(92) + String(",")
    + String("\"Humidity\":") + String(h) + String(",") 
    + String("\"Temperature\":") + String(t) 
    + "}"
  );

  redis.println(String("*4\r\n")
    + "$8\r\n" 
    + "JSON.SET\r\n"
    + "$10\r\n" 
    + "dht11.real" + "\r\n"
    + "$1\r\n"
    + String(".") + "\r\n"
    + "$70\r\n" 
    + "{" 
    + String("\"Date\":\"") + String(formattedTime) + String("\",") 
    + String("\"AQI\":") + String(92) + String(",")
    + String("\"Humidity\":") + String(h) + String(",") 
    + String("\"Temperature\":") + String(t) 
    + "}"
  );
  
/*
  redis.print(
    String("*4\r\n")
    + "$14\r\n" 
    + "JSON.ARRAPPEND\r\n"
    + "$11\r\n" 
    + "dht11.graph" + "\r\n"
    + "$1\r\n"
    + String(".") + "\r\n"
    + "$70\r\n" 
    + "{" 
    + String("\"Date\":\"") + String(formattedTime) + String("\",") 
    + String("\"AQI\":") + String(92) + String(",")
    + String("\"Humidity\":") + String(h) + String(",") 
    + String("\"Temperature\":") + String(t)  
    + "}" + "\r\n"
  );
*/
 
  

/*
  while (redis.available() != 0)
    Serial.print((char)redis.read());
    delay(10000);
*/
}
