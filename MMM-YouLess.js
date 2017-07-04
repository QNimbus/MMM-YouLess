/* Magic Mirror
 * Module: MMM-YouLess
 *
 * By B. van Wetten
 * MIT Licensed.
 */

Module.register("MMM-YouLess", {
	// Module config defaults.
	defaults: {
		initialLoadDelay: 0, 		// 0 seconds delay
		retryDelay: 2 * 1000,		// retry after 2 seconds
		updateInterval: 10 * 1000, 	// every 10 seconds
		symbol: "bolt",
	},

	start: function () {
		this.loaded = false;
		this.powerUsage = -1;
		this.powerUsageHigh = -1;
		this.maxLevel = 1500;
		Log.info("Starting module: " + this.name);

		this.scheduleUpdate(this.config.initialLoadDelay);
	},

	getStyles: function () {
		return [
			this.file("css/youless.css"),
			"font-awesome.css",
		];
	},

	getScripts: function () {
		return [
			"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",  // this file will be loaded from the jquery servers.
			this.file("jsGauge/lib/jsGauge.js"),
		];
	},

	getDom: function () {
		var wrapper = jQuery(document.createElement("div")).addClass("GaugeMeter").attr("id","YouLessGauge");;
		var obj = {
			background_style: "RGBa(255,255,255,0.6)",
			scale_style: "RGBa(255,255,255,0.6)",
			append: " kWh",
			size: 200,
			width: "15",
			style: "arc",
			theme: "Black",
			animate_gauge_colors: "1",
			animate_text_colors: "1",
			label: "Power usage",
			label_color: "#fff",
			stripe: "3",
			used: this.powerUsage,
			total: 5000,
		}
		wrapper.data(obj);
		wrapper.jsGauge();
		return wrapper[0];
	},

	updatePowerUsage: function () {
		var self = this;

		this.sendSocketNotification("QUERY");

		// Use default timeout if already loaded, else use the retryDelay if module hasn't loaded yet
		self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
	},

	processPowerUsage: function (data) {
		if (data) {
			this.powerUsageHigh = this.powerUsageHigh < data.pwr ? data.pwr : this.powerUsageHigh;
			this.powerUsage = data.pwr;
			this.loaded = true;
			this.updateDom(this.config.animationSpeed);
		}
	},

	/* scheduleUpdate()
 	 * Schedule next update.
 	 *
 	 * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
 	 */
	scheduleUpdate: function (delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setTimeout(function () {
			self.updatePowerUsage();
		}, nextLoad);
	},

	notificationReceived: function (notification, payload, sender) {
		if (notification === "DOM_OBJECTS_CREATED") {
			this.loaded = true;
			this.sendSocketNotification("CONFIG", this.config);
		}
	},

	socketNotificationReceived: function (notification, payload) {
		var self = this;

		var responseReceived = function (payload) {
			self.processPowerUsage(JSON.parse(payload));
		};

		var acceptedNotifications = {
			"RESPONSE": responseReceived,
		};

		// Call appropriate handler for socket notification
		acceptedNotifications[notification] && typeof acceptedNotifications[notification] === "function" && acceptedNotifications[notification](payload);
	},
});