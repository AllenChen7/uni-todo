<template>
	<view class="">
		<!-- <view class="u-card-wrap">
			<u-card @click="click" @head-click="headClick" :title="title" :sub-title="subTitle" :thumb="thumb" :padding="padding" :border="border">
				<view class="" slot="body"> 
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">
							瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半
						</view>
						<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">
							釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放
						</view>
						<image src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="" slot="foot">
					<u-icon v-if="bottomSlot" name="chat-fill" size="34" label="30评论"></u-icon>
				</view>
			</u-card>
		</view> -->
	
		
		<view class="u-card-wrap" v-for="(item, index) in todoList" :key="item.id">
			<u-card @click="click(item)" @head-click="headClick(item)" :title="item.title" :sub-title="item.plan_end_time" :thumb="item.user.avatar" :padding="padding" :border="border">
				<view class="" slot="body"> 
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">
							期望开始时间：{{item.plan_start_time || '长期'}}
						</view>
						<image v-if="item.image" :src="item.image" mode="aspectFill"></image>
					</view>
					<view v-if="item.desc" class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2 item-desc">
							备注：{{item.desc}}
						</view>
					</view>
				</view>
				<!-- <view class="" slot="foot">
					<u-icon v-if="bottomSlot" name="chat-fill" size="34" label="30评论"></u-icon>
				</view> -->
			</u-card>
		</view>
		
		<u-loadmore :status="listStatus" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				subTitle: '',
				thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				padding: 30,
				bottomSlot: true,
				border: false,
				todoList: [],
				listStatus: 'loadmore',
				page: 1,
				more: true
			}
		},
		onReachBottom() {
			if(!this.more) return ;
			this.listStatus = 'loading';
			this.page = ++ this.page;
			setTimeout(() => {
				this.$u.api.getToDoList({
					page: this.page
				}).then(res => {
					this.todoList = this.todoList.concat(res.data);
					if (this.$u.test.isEmpty(res.data)) {
						this.listStatus = 'nomore';
						this.more = false;
					} else {
						this.listStatus = 'loadmore';
					}
				})
			}, 2000)
		},
		onLoad() {
			// this.$u.vuex('vuex_token', '');
			this.$u.api.getToDoList().then(res => {
				this.todoList = res.data
			})
		},
		onShow() {
			
		},
		onPullDownRefresh() {
		    this.$u.api.getToDoList().then(res => {
		    	this.todoList = res.data
				//数据请求完成之后停止下拉刷新
				uni.stopPullDownRefresh();
				this.page = 1;
				this.more = true;
		    })
		},
		methods: {
			click(index) {
				console.log(index, 'click');
				this.$u.route({
					url: '/pages/index/show',
					params: {
						id: index.id
					}
				})
			},
			headClick(index) {
				console.log(index, 'headClick');
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-demo {
		padding-top: 0;
	}
	
	.u-card-wrap { 
		background-color: $u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 26rpx;
		color: #717171;
		padding: 20rpx 10rpx;
	}
		
	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	},
	
	.u-body-item-title {
		width: 600rpx;
	}
	
	.wrap {
		padding: 24rpx;
	}
	
	.item-desc {
		padding: 20rpx 0rpx;
	}
</style>
