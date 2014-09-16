module.exports = {
	port: 5000,
	ui: {
		publicDir: '/public-optimized',
        compiled: true,
		staticBase: '/',
		googleAnalyticsID: 'UA-18204442-27',
		googleAnalyticsDev: false
	},
	redis: {
		useVCAP: true,
		host: '127.0.0.1',
		port: 6379
	},
	mongo: {
		useVCAP: true,
		host: '127.0.0.1',
		port: 27017,
		dbname: 'transaction-builder-mongo-db' // this db will be created if it's not there already. Good thing? Depends on what you're doing
	},
	// Fuel configs, one per stack keyed on the FUEL.StackKey (found in ConfigSettings)
	fuelConfigs: {
		// there should be one entry per config file, except for production which should have all the stack keys
		// create other config files in this directory that have the same name as your NODE_ENV variable. They will overwrite these settings.
		// this is what you'll use for testing
		QA1S1: {
			appId: '404f16d4-fe2c-4468-9dbe-39e4674119eb',
			clientId: '7d9a5a989tyz7yadh5ghqtw8',
			clientSecret: '3PDUcqYePA5j2xh3UpqncgZA',
			appSignature: 'k3dhy3s1avktf3ns1tnfmvf21b4nqkjyy0bcnpl4rg3lsevqncw0cvw12np21chdrrh1ht0ag3q3f51kik0i3litkbr15fwhgkf0pa4nypcfdnoil3rmtckd55v1d5o3p5ritoqpkvfv0so5yaku4xsvndy1xlyl5rroz2jkinfcndtkl35cheqfjfdjx3vjujo3csofap3mybwg2scsu3dafwcquhk4hcmff5dwxl0ayqnhaof2no4cfrzrg5v',
			authUrl: 'https://auth-qa1s1.exacttargetapis.com/v1/requestToken?legacy=1',
			legacyRestHost: 'rest.s1.qa1.exacttarget.com',
			fuelapiRestHost: 'www.exacttargetapis.com',
			baseUrl: 'http://rest.s1.qa1.exacttarget.com/rest/'
		},
		QA1S2: {
			appId: '404f16d4-fe2c-4468-9dbe-39e4674119eb',
			clientId: 'jv7c2w4p55u7rtsbepzfymep',
			clientSecret: 'FQHVfKHMDwjMeM7dUNc7t7da',
			appSignature: 'qvpcjrw4r4zi1md3vuwyyol4qbtpqnubpgfqcswazmkvrgu0wfgacitr5i2ddaftv5zk3bb0zlo1axhitduncayeuiia0524nrwujoqkgwwush5e1lrstz0cb5hohzrqnwhpiylhbxyjqtlu4eg45uo4brfv44dupqhkotg5eto23csun4tz0ovl13ocq1lvekvf0tkwwj0juweo5drqo2y5i4yjvkfjvud3mrcj5hstece1ggwezi1vraxq3n1',
			authUrl: 'https://auth-qa1s2.exacttargetapis.com/v1/requestToken?legacy=1',
			legacyRestHost: 'rest.s2.qa1.exacttarget.com',
			fuelapiRestHost: 'www.exacttargetapis.com',
			baseUrl: 'http://rest.s2.qa1.exacttarget.com/rest/'
		},
        QA2S1: {
            appId: '404f16d4-fe2c-4468-9dbe-39e4674119eb',
            clientId: '84e2wdxb83zvcwhdduc2s3vx',
            clientSecret: 'TQ4guZGxUjCGswxvdCSjrMMU',
            appSignature: 'oq4acc435igh5o25crhop45afoz3aeuj0nuep340lzc1foy4w2cbu4afdej3r2vkkzqrl3gcg2qfv52p15tq0milzidrdm2i4sfxiwdih4wfutm3wjag4i41jyxypnln0mqgvb34ta4mvwxyjpvj20jvppmj1zagbk2lpazrxtkdkf5dneoahtvrydbiaikkdzdbcx5jn3av2wo3ttp4xcd0b5rotr2dsg0jk5otmripzpuzv0wspcydbtjirza',
            authUrl: 'https://auth-qa2s1.exacttargetapis.com/v1/requestToken?legacy=1',
            legacyRestHost: 'rest.s1.qa2.exacttarget.com',
            fuelapiRestHost: 'www.exacttargetapis.com',
            baseUrl: 'http://rest.s1.qa2.exacttarget.com/rest/'
        },
        QA3S1: {
            appId: '404f16d4-fe2c-4468-9dbe-39e4674119eb',
            clientId: 'vrnf8cs8q9nwwjbsnmsv2j8v',
            clientSecret: 'mAUnNBcbUKVekrWS7tuUFfpx',
            appSignature: 'qyxladpaxi4cnhcfjjfvi2tagxsowofnlsu33oizmqt0f0ogmybgjs10nf1ysxtvb13jn4p5kfmuqikkdwgveog2o4zjr2zpcs5i42i4twneur1rqq2r1k5wveigc2zhszhx1kh5hzildiautp4vwgr5h3ak2wjdmh55rvn2fiv40twul3crk0fk00stbotixaznwnr54dti3wwklvmcgrqjxed03qtsj23pp4pvdqqq2crqtjf0uqckfepnorn',
            authUrl: 'https://auth-qa3s1.exacttargetapis.com/v1/requestToken?legacy=1',
            legacyRestHost: 'rest.s1.qa3.exacttarget.com',
            fuelapiRestHost: 'www.exacttargetapis.com',
            baseUrl: 'http://rest.s1.qa3.exacttarget.com/rest/'
        },
        S1: {
            appId: '74dcb71f-ab2f-4e7f-94dc-22cec7a915cb',
            clientId: 't59zmtcuavxr6cwfjpu7fqyk',
            clientSecret: 'BAar4xfyq2RbWuGtJPkR3RBh',
            appSignature: 'qni0u0s3efg03v4yzgn1ldw5pp4wogthtlxsdwf1r5qg0j5tqg00p0ydeh2p4dsn3coydgrktnssevdtlzhuprwbmriskdlb2kl3crdyp0unyy131g4e1xbsy0cczayxhzkgstx5ob5vdscouhvwqepopysr1533da4bp0cmmxoc0avv11zda2icjq1eayu4341trs3ykguuby54fh2lkpodekcupl2nsxwgeefuihmkr3mv2djacg5dvafu001',
            authUrl: 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1',
            legacyRestHost: 'rest.s1.exacttarget.com',
            fuelapiRestHost: 'www.exacttargetapis.com',
            baseUrl: 'http://rest.s1.exacttarget.com/rest/'
        },
        S4: {
            appId: 'ab3cd717-28d9-477f-8e3e-c0b70a218c05',
            clientId: 'hu7wwvmh5m9g8yn8hsenz3wu',
            clientSecret: 'Ru7VyP6QsZH8Mv75Z664SJZf',
            appSignature: 'bdbh01yh2ycbljhx0ev4pagn1la2vcbzfbt15ouyzw5nptl0c0izr53b1k232bx1ed0zwqahtdk0xznues45pp20ykg3tv2w4oaoctbo4snaiuuazsrs0hxsr3kflbjji4yzx2de401gqqh3pua4jegtwnr1omslhx1joyuprfvxhy33crcixmufhwls4ao11qjovamdy0q2xjiicxu3hux50saz3tfbh0afaerqandhrhr3vmp40cvoua534uq',
            authUrl: 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1',
            legacyRestHost: 'rest.s4.exacttarget.com',
            fuelapiRestHost: 'www.exacttargetapis.com',
            baseUrl: 'http://rest.s4.exacttarget.com/rest/'
        },
        S6: {
            appId: 'b5895bec-6936-4a28-91ac-cd2c42fd44de',
            clientId: 'tu87ckjrwpe52zx7kbtymezm',
            clientSecret: 'kAhVZapVuQakxuw7TQhJaAzK',
            appSignature: 'k2gltjnr51wssct2dfrwlln1qcitjbxnqh554vanzxnoy3yadzhbv4xd1bwqptwmxff5ddaobt4b5uvlno35m4njcxgqwmmj1pvjxm1cpvecgefruoyyxeiuda0qelxha1s0znjsgayttaj4jrxd34meeioic3tabfsmpgl1adhgpg04icardzujyvpoob4kffgwdevhgjkwdlzdqf0vyqarb2go1y4mkvanc2rdnituuvupmqmj4si3szb1asb',
            authUrl: 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1',
            legacyRestHost: 'rest.s6.exacttarget.com',
            fuelapiRestHost: 'www.exacttargetapis.com',
            baseUrl: 'http://rest.s6.exacttarget.com/rest/'
        },
        S7: {
            appId: 'cd124f04-c977-4a96-ab2c-b5f96b42acb8',
            clientId: 'kn6vtxw65qk9anm9648m3mpp',
            clientSecret: 'TbczYtzJ2XrscABtNqud3Nzh',
            appSignature: 'wlxsuxg05opzdgrn1qiwa4havvoqvhsb0fcseofeulpvi325oxyyt4kleqivcj03zb1kf2ryn11uilvzbh5euazor2xtkawwexf5qg2qnqwtpjk5vmulcz22z0pu4qwch55myhbhnl4tocdatkbu3rhlckxdhpv5d1jyua3f4sckrucoxcxgv0splqlo5papqc43lrxjayiwjcikphk2q2f1w422vol41l51q4wdoojurfoe0tlnubprruhicy0',
            authUrl: 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1',
            legacyRestHost: 'rest.s7.exacttarget.com',
            fuelapiRestHost: 'www.exacttargetapis.com',
            baseUrl: 'http://rest.s7.exacttarget.com/rest/'
        }
	},
    session: {
        useRedisStore: true,
        useFuelTokenMiddleware: true,
        useLessCompiler: false,
        key: 'transaction-builder-app396Key'
    },
    monitoring: {
        nodetime: {
            appName: 'Transaction Builder - Production'
        }
    },
	csrfFreeRoutes: {
		'/login': true
	}
};
