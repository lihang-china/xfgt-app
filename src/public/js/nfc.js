var NfcAdapter;
export default {
	// 初始化NFC
	NFCInit() {
		try {
			let main2 = plus.android.runtimeMainActivity();
			let Intent = plus.android.importClass('android.content.Intent');
			let Activity = plus.android.importClass('android.app.Activity');
			let PendingIntent = plus.android.importClass('android.app.PendingIntent');
			let IntentFilter2 = plus.android.importClass('android.content.IntentFilter');
			NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter');
			let _nfcAdapter = NfcAdapter.getDefaultAdapter(main2);
			let ndef = new IntentFilter2('android.nfc.action.NDEF_DISCOVERED');
			let tag = new IntentFilter2('android.nfc.action.TAG_DISCOVERED');
			let tech = new IntentFilter2('android.nfc.action.TECH_DISCOVERED');
			let intentFiltersArray = [ndef, tag, tech];
			let techListsArray = [
				['android.nfc.tech.Ndef'],
				['android.nfc.tech.IsoDep'],
				['android.nfc.tech.NfcA'],
				['android.nfc.tech.NfcB'],
				['android.nfc.tech.NfcF'],
				['android.nfc.tech.Nfcf'],
				['android.nfc.tech.NfcV'],
				['android.nfc.tech.NdefFormatable'],
				['android.nfc.tech.MifareClassi'],
				['android.nfc.tech.MifareUltralight']
			];
			let _intent = new Intent(main2, main2.getClass());
			_intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
			let pendingIntent = PendingIntent.getActivity(main2, 0, _intent, 0);
			if (_nfcAdapter == null) {} else if (_nfcAdapter.isEnabled() == false) {} else {
				_nfcAdapter.enableForegroundDispatch(main2, pendingIntent, IntentFilter2, techListsArray);
			}
		} catch (e) {}
	},
	// 读取NFC上的数据
	NFCReadUID() {
		let main3 = plus.android.runtimeMainActivity();
		let _intent = main3.getIntent();
		let _action = _intent.getAction();
		if (NfcAdapter.ACTION_NDEF_DISCOVERED == _action || NfcAdapter.ACTION_TAG_DISCOVERED == _action ||
			NfcAdapter.ACTION_TECH_DISCOVERED == _action) {
			let Tag = plus.android.importClass('android.nfc.Tag');
			let tagFromIntent = _intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
			let bind_code = _intent.getByteArrayExtra(NfcAdapter.EXTRA_ID);
			bind_code = this.byteArrayToHexString(bind_code);
			uni.$emit('nfcCode', {
				code: bind_code
			})
		}
	},
	// 将转大写格式
	byteArrayToHexString(inarray) {
		let i, j, inn;
		let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
		let out = "";
		for (j = 0; j < inarray.length; ++j) {
			inn = inarray[j] & 0xff;
			i = (inn >>> 4) & 0x0f;
			out += hex[i];
			i = inn & 0x0f;
			out += hex[i];
		}
		return out;
	},
	
}
// <script>
// 	import nfcFun from "../../static/js/nfc.js";
// 	var NfcAdapter;
// 	export default {
// 		created(option) {
// 			nfcFun.NFCInit();
// 		},
// 		onHide() {
// 			nfcFun.NFCReadUID();
// 		},
// 		onLoad() {
// 			// 接收nfc的值
// 			uni.$on('nfcCode',(data)=>{
// 				console.log(data);
// 			})
// 		},
// 		onUnload() {
// 			uni.$off('nfcCode')//移除监听nfc
// 		}
// 	}
// </script>

