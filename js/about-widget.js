/**
 *      _    _                 _    __        ___     _            _         _                  ____            _       _
 *     / \  | |__   ___  _   _| |_  \ \      / (_) __| | __ _  ___| |_      | | __ ___   ____ _/ ___|  ___ _ __(_)_ __ | |_
 *    / _ \ | '_ \ / _ \| | | | __|  \ \ /\ / /| |/ _` |/ _` |/ _ \ __|  _  | |/ _` \ \ / / _` \___ \ / __| '__| | '_ \| __|
 *   / ___ \| |_) | (_) | |_| | |_    \ V  V / | | (_| | (_| |  __/ |_  | |_| | (_| |\ V / (_| |___) | (__| |  | | |_) | |_
 *  /_/   \_\_.__/ \___/ \__,_|\__|    \_/\_/  |_|\__,_|\__, |\___|\__|  \___/ \__,_| \_/ \__,_|____/ \___|_|  |_| .__/ \__|
 *                                                      |___/                                                    |_|
 *  @author Brayden Aimar
 */

 /* eslint-disable no-console */

define([ 'jquery' ], $ => ({

	id: 'about-widget',
	name: 'About',
	shortName: 'About',
	btnTheme: 'default',
	// icon: 'glyphicon glyphicon-info-sign',
	icon: 'material-icons info_outline',
	desc: 'A description of the program and how to contact developer about issues or bugs.',
	publish: {},
	subscribe: {},
	foreignPublish: {
		'/main/widget-loaded': ''
	},
	foreignSubscribe: {
		'/main/all-widgets-loaded': ''
	},

	widgetDom: [ 'about-panel' ],
	widgetVisible: false,

	initBody() {

		console.group(`${this.name}.initBody()`);

		subscribe('/main/window-resize', this, this.resizeWidgetDom.bind(this));
		subscribe('/main/widget-visible', this, this.visibleWidget.bind(this));

		// subscribe('/connection-widget/recvPortList', this, this.recvPortList.bind(this));

		publish('/main/widget-loaded', this.id);

		return true;

	},
	resizeWidgetDom() {

		/* eslint-disable prefer-const*/
		// If this widget is not visible, do not bother updating the DOM elements.
		if (!this.widgetVisible) return false;

		const that = this;

		let containerHeight = $(`#${this.id}`).height();
		let marginSpacing = 0;
		let panelSpacing = 0;

		for (let i = 0; i < this.widgetDom.length; i++) {

			let panel = that.widgetDom[i];
			let panelDom = $(`#${that.id} .${panel}`);

			marginSpacing += Number(panelDom.css('margin-top').replace(/px/g, ''));

			if (i === that.widgetDom.length - 1) {

				marginSpacing += Number(panelDom.css('margin-bottom').replace(/px/g, ''));

				let panelHeight = containerHeight - (marginSpacing + panelSpacing);

				panelDom.css({ height: `${panelHeight}px` });

			} else {

				panelSpacing += Number(panelDom.css('height').replace(/px/g, ''));

			}

		}

		/* eslint-enable prefer-const */
		return true;

	},
	visibleWidget(wgtVisible, wgtHidden) {

		if (wgtVisible === this.id) {

			this.widgetVisible = true;
			this.resizeWidgetDom();

		} else if (wgtHidden === this.id) {

			this.widgetVisible = false;

		}

	}

})  /* arrow-function */
);	/* define */
