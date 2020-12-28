<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="checkbox-mark" label-width="120" :label-position="labelPosition" label="TODO" prop="title">
				<u-input :border="border" placeholder="请输入 TODO" v-model="model.title" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="tags" label="分类" prop="cate">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.cate" placeholder="请选择分类" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="calendar" label-width="120" :label-position="labelPosition" label="期望开始时间" prop="startTime">
				<u-input :border="border" placeholder="请选择期望开始时间" v-model="model.plan_start_time" @click='showChange' type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="calendar" label-width="120" :label-position="labelPosition" label="期望结束时间" prop="startTime">
				<u-input :border="border" placeholder="请选择期望结束时间" v-model="model.plan_end_time" @click='endTimeShowChange' type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="map" label="所在地区" prop="region" label-width="150">
				<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region" placeholder="请选择地区" @click="pickerShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="image" label="上传图片" prop="image" label-width="150">
				<u-upload width="160" height="160" ref="uUpload" @on-success="imageReturn" max-count="1" :action="uploadAction"></u-upload>
			</u-form-item>
			<u-form-item :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="info-circle" label="备注" prop="desc">
				<u-input type="textarea" :border="border" placeholder="请填写备注" v-model="model.desc" />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		<u-calendar v-model="show" ref="calendar" @change="startTimeChange" :mode="mode"
			:start-text="startText" :end-text="endText" :range-color="rangeColor"
			:range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :min-date="minStartTime" :max-date="maxStartTime" :btn-type="btnType"
		>
		</u-calendar>
		<u-calendar v-model="endTimeShow" ref="calendar" @change="endTimeChange" :mode="mode"
			:start-text="startText" :end-text="endText" :range-color="rangeColor"
			:range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType" :min-date="minEndTime" :max-date="maxEndTime"
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
				title: '',
				desc: '',
				region: '',
				code: '',
				image: '',
				plan_start_time: '',
				plan_end_time: '',
				cate: '计划'
			},
			uploadAction: 'http://todo.hyyphp.online/api/upload/image',
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
			minStartTime: '',
			maxStartTime: '',
			minEndTime: '',
			maxEndTime: '',
			rules: {
				title: [
					{
						required: true,
						message: '请输入TODO',
						trigger: 'blur' ,
					},
					{
						min: 3,
						max: 50,
						message: 'TODO长度在3到5个字符',
						trigger: ['change','blur'],
					},
				],
				desc: [
					{
						// required: true,
						message: '请填写简介'
					},
					{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change' ,
					},
				],
				region: [
					{
						// required: true,
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
		var myDate = new Date();
		var today = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
		var tenDay = myDate.getFullYear() + 10 + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
		this.minStartTime = today
		this.minEndTime = today
		this.maxEndTime = tenDay
		this.maxStartTime = tenDay
	},
	methods: {
		imageReturn(data, index, lists, name) {
			if(data.code == 200) {
				this.model.image = data.data.path;
			} else {
				this.$refs.uUpload.remove(index)
				this.$u.toast(data.msg);
			}
		},
		startTimeChange(e) {
			this.model.plan_start_time = e.result
			this.minEndTime = e.result
		},
		endTimeChange(e) {
			this.model.plan_end_time = e.result
			this.maxStartTime = e.result
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
					this.$u.api.addTodos(this.model).then(res => {
						this.$u.toast(res.msg);
						setTimeout(() => {
								this.$u.route({
									url: '/pages/index/index',
									type: 'reLaunch'
								})
							}, 1000)
					}).catch(res=>{
						console.log(res, 'rreess')
					})
				} else {
					console.log('验证失败');
				}
			});
		},
		// 点击actionSheet回调
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.cate = this.actionSheetList[index].text;
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
