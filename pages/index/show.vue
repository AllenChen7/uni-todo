<template>
	<view class="wrap">
		<u-form>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="checkbox-mark" label-width="120" :label-position="labelPosition" label="TODO" prop="title">
				<u-input :border="border" disabled placeholder="请输入 TODO" v-model="todoInfo.title" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="tags" label="分类" prop="cate">
				<u-input :border="border" disabled placeholder="请选择分类" v-model="todoInfo.cate" type="text"></u-input>
			</u-form-item>
			<u-form-item v-if="todoInfo.plan_start_time" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="calendar" label-width="120" :label-position="labelPosition" label="期望开始时间" prop="plan_start_time">
				<u-input :border="border" disabled placeholder="请选择期望开始时间" v-model="todoInfo.plan_start_time" @click='showChange' type="text"></u-input>
			</u-form-item>
			<u-form-item v-if="todoInfo.plan_end_time" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="calendar" label-width="120" :label-position="labelPosition" label="期望结束时间" prop="plan_end_time">
				<u-input :border="border" disabled placeholder="请选择期望结束时间" v-model="todoInfo.plan_end_time" @click='endTimeShowChange' type="text"></u-input>
			</u-form-item>
			<u-form-item v-if="todoInfo.region" :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="map" label="所在地区" prop="region" label-width="150">
				<u-input :border="border" disabled type="select" :select-open="pickerShow" v-model="todoInfo.region" placeholder="请选择地区" @click="pickerShow = true"></u-input>
			</u-form-item>
			<u-form-item v-if="todoInfo.image" :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="image" label="上传图片" prop="image" label-width="150">
				<u-upload width="160" height="160" ref="uUpload" :file-list="fileList" :show-progress="showProgress" :deletable="deleteable" max-count="1"></u-upload>
			</u-form-item>
			<u-form-item v-if="todoInfo.desc" :label-position="labelPosition" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="info-circle" label="备注" prop="desc">
				<u-input disabled type="textarea" :border="border" placeholder="请填写备注" v-model="todoInfo.desc" />
			</u-form-item>
		</u-form>
		<u-button v-if="todoInfo.doneFlag" @click="submit">完成</u-button>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		<u-modal v-model="modelShow" :show-cancel-button="showCancelButton" @confirm="todoDone" :content="content"></u-modal>
	</view>
</template>

<script>
export default {
	data() {
		let that = this;
		return {
			fileList: [
				{
					url: '',
				}
			],
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
			id: 0,
			todoInfo: {},
			deleteable: false,
			showProgress: false,
			modelShow: false,
			content: '确认完成当前 TODO？',
			showCancelButton: true
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
		
	},
	onShow() {
		var loginRes = this.checkLogin('/pages/template/index', '2');
		if(!loginRes){return false;}
		/*获取当前路由*/
		let curPage = this.getCurPage();
		console.log(curPage, 'cc')
		this.id = curPage.id
		
		if(!this.id) {
			console.log('todo')
		}
		this.getInfo();
	},
	methods: {
		todoDone() {
			this.$u.api.done({id: this.id}).then(res => {
				this.todoInfo.doneFlag = false
			})
		},
		getInfo(){
			this.$u.api.getTodoInfo({id: this.id}).then(res => {
				this.todoInfo = res.data
				
				if (res.data.image) {
					this.fileList[0].url = res.data.image
				}
			})
		},
		imageReturn(data, index, lists, name) {
			
		},
		startTimeChange(e) {
			
		},
		endTimeChange(e) {
			
		},
		showChange() {
			this.show = true;
		},
		endTimeShowChange() {
			this.endTimeShow = true;
		},
		submit() {
			this.modelShow = true
		},
		// 点击actionSheet回调
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.cate = this.actionSheetList[index].text;
		},
		// 选择地区回调
		regionConfirm(e) {
			
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
