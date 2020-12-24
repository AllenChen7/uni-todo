<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="checkbox-mark" label-width="120" :label-position="labelPosition" label="TODO" prop="name">
				<u-input :border="border" placeholder="请输入 TODO" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="tags" label="分类" prop="sex">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.sex" placeholder="请选择分类" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="calendar" label-width="120" :label-position="labelPosition" label="期望开始时间" prop="startTime">
				<u-input :border="border" placeholder="请选择期望开始时间" v-model="model.startTime" @click='showChange' type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="calendar" label-width="120" :label-position="labelPosition" label="期望结束时间" prop="startTime">
				<u-input :border="border" placeholder="请选择期望结束时间" v-model="model.endTime" @click='endTimeShowChange' type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="map" label="所在地区" prop="region" label-width="150">
				<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region" placeholder="请选择地区" @click="pickerShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="photo" label="上传图片" prop="photo" label-width="150">
				<u-upload width="160" height="160" max-count="1"></u-upload>
			</u-form-item>
			<u-form-item :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="info-circle" label="备注" prop="intro">
				<u-input type="textarea" :border="border" placeholder="请填写备注" v-model="model.intro" />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		<u-calendar v-model="show" ref="calendar" @change="startTimeChange" :mode="mode"
			:start-text="startText" :end-text="endText" :range-color="rangeColor"
			:range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
		>
		</u-calendar>
		<u-calendar v-model="endTimeShow" ref="calendar" @change="endTimeChange" :mode="mode"
			:start-text="startText" :end-text="endText" :range-color="rangeColor"
			:range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
		>
		</u-calendar>
	</view>
</template>

<script>
export default {
	data() {
		let that = this;
		return {
			model: {
				name: '',
				intro: '',
				region: '',
				code: '',
				photo: '',
				startTime: '',
				endTime: '',
			},
			show: false,
			endTimeShow: false,
			mode: 'date',
			result: "请选择日期",
			startText: '开始',
			endText: '结束',
			rangeColor: '#2979ff',
			rangeBgColor: 'rgba(41,121,255,0.13)',
			activeBgColor: '#2979ff',
			btnType: 'primary',
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: 'blur' ,
					},
					{
						min: 3,
						max: 5,
						message: '姓名长度在3到5个字符',
						trigger: ['change','blur'],
					},
					{
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.chinese(value);
						},
						message: '姓名必须为中文',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ['change','blur'],
					},
					// 异步验证，用途：比如用户注册时输入完账号，后端检查账号是否已存在
					// {
					// 	trigger: ['blur'],
					// 	// 异步验证需要通过调用callback()，并且在里面抛出new Error()
					// 	// 抛出的内容为需要提示的信息，和其他方式的message属性的提示一样
					// 	asyncValidator: (rule, value, callback) => {
					// 		this.$u.post('/ebapi/public_api/index').then(res => {
					// 			// 如果验证出错，需要在callback()抛出new Error('错误提示信息')
					// 			if(res.error) {
					// 				callback(new Error('姓名重复'));
					// 			} else {
					// 				// 如果没有错误，也要执行callback()回调
					// 				callback();
					// 			}
					// 		})
					// 	},
					// }
				],
				intro: [
					{
						required: true,
						message: '请填写简介'
					},
					{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change' ,
					},
					// 正则校验示例，此处用正则校验是否中文，此处仅为示例，因为uView有this.$u.test.chinese可以判断是否中文
					{
						pattern: /^[\u4e00-\u9fa5]+$/gi,
						message: '简介只能为中文',
						trigger: 'change',
					},
				],
				region: [
					{
						required: true,
						message: '请选择地区',
						trigger: 'change',
					}
				],
			},
			border: false,
			check: false,
			selectStatus: 'close',
			actionSheetList: [
				{
					text: '计划'
				},
				{
					text: '日常'
				}
			],
			actionSheetShow: false,
			pickerShow: false,
			selectShow: false,
			radioCheckWidth: 'auto',
			radioCheckWrap: false,
			labelPosition: 'top',
			codeTips: '',
			errorType: ['message'],
		};
	},
	onLoad() {

	},
	computed: {
		borderCurrent() {
			return this.border ? 0 : 1;
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	onShow() {
		var loginRes = this.checkLogin('/pages/template/index', '2');
				if(!loginRes){return false;}
	},
	methods: {
		startTimeChange(e) {
			this.model.startTime = e.result
		},
		endTimeChange(e) {
			this.model.endTime = e.result
		},
		showChange() {
			this.show = true;
		},
		endTimeShowChange() {
			this.endTimeShow = true;
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					if(!this.model.agreement) return this.$u.toast('请勾选协议');
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		},
		// 点击actionSheet回调
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.sex = this.actionSheetList[index].text;
		},
		// 选择地区回调
		regionConfirm(e) {
			this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
		},
		borderChange(index) {
			this.border = !index;
		},
		codeChange(text) {
			this.codeTips = text;
		}
	}
};
</script>

<style scoped lang="scss">
.wrap {
	padding: 30rpx;
}

.agreement {
	display: flex;
	align-items: center;
	margin: 40rpx 0;

	.agreement-text {
		padding-left: 8rpx;
		color: $u-tips-color;
	}
}
</style>
