module.exports = {
	ui: {
		publicDir: '/public',
        compiled: false,
        googleAnalyticsID: 'UA-18204442-27',
        googleAnalyticsDev: true
	},
    monitoring: {
        nodetime: {
            appName: 'Transaction Builder - Development'
        }
    },
    session: {
        useLessCompiler: true
    },
    fuelConfigs: {
        QA1S1: {
            appId: '367c82a9-6c6a-4cd2-87e4-c565c4fa2d0e',
            clientId: 'eaezcekpzupg9qyyu6heukja',
            clientSecret: 'Y9FjNAmZH6JeCcf8XBkz7da8',
            appSignature: '0bw3ry2if1oyfy2goc5mnkelmbfxtn2pntkep24r5dvcxhq0tabm2hco2pxld2jdx0bfwcxhwttgvwmi4kkducwirq0yiq1soa5m4jgnmvl1ogytujblsowjywt545agpm2kpafwxvuf2xbphozkrb2vgbyuwo5cdsa0zegq2mbwhkqenwird1csgctaz5gqsspwbtqu00ngalvibql0btfoj21ilxl2ymrxqtpuqd2aw43aohhv2nqiaki3qgr',
            authUrl: 'https://auth-qa1s1.exacttargetapis.com/v1/requestToken?legacy=1',
            legacyRestHost: 'rest.s1.qa1.exacttarget.com',
            fuelapiRestHost: 'www.exacttargetapis.com',
            baseUrl: 'http://rest.s1.qa1.exacttarget.com/rest/'
        }
    }
};
