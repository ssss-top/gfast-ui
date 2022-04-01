<template>
  <div class="app-container">
      <el-card class="box-card" shadow="never">
            <el-row type="flex" justify="space-between" align="center">
                <el-col :xs="16" :sm="16" :md="4" :lg="4" :xl="4"><label>BTC/USDT/FIL</label></el-col>
                <el-col :xs="4" :sm="4" :md="1" :lg="1" :xl="1"><el-button type="primary" size="mini" @click="handleStopRobot">停止</el-button></el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <label class="label">投资额($)</label>
                    <div class="value">{{invest}}</div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <label class="label">总收益($)</label>
                    <div class="value">{{profit}} </div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <label class="label">收益率 <el-divider direction="vertical"></el-divider> 总年化</label>
                    <div class="value"> {{profitRate}}% <el-divider direction="vertical"></el-divider> {{ape}}%</div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"> 
                    <label class="label">成交次数</label>
                    <div class="value"> {{dealCount}}</div>
                </el-col>
            </el-row>
        </el-card>
        <!-- 订单详情 -->
        <el-card shadow="never" style="margin-top:20px;">
            <h3>订单详情</h3>
            <el-row class="details" >
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <label>当前持仓</label>
                    <el-row type="flex">
                        <el-col>12.00 BTC</el-col>
                        <el-col><el-progress :percentage="percentage" :color="customColor"></el-progress></el-col>
                    </el-row>  
                    <el-row type="flex">
                        <el-col>2123213 FIL</el-col>
                        <el-col><el-progress :percentage="percentage" :color="customColor"></el-progress></el-col>
                    </el-row>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <label>开单持仓</label>
                    <el-row type="flex">
                        <el-col>10 BTC</el-col>
                        <el-col><el-progress :percentage="percentage" :color="customColor"></el-progress></el-col>
                    </el-row>  
                    <el-row type="flex">
                        <el-col>2221221 FIL</el-col>
                        <el-col><el-progress :percentage="percentage" :color="customColor"></el-progress></el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
   
        <!-- 成交记录 -->
        <el-card class="box-card" shadow="never" style="margin-top:20px;">
        <h3>成交记录</h3>
            <el-table
              :header-cell-style="{background:'#fff'}"
              :data="rechargeList"
              style="width:100%">
              <el-table-column
                prop="dealAt"
                label="成交时间">
              </el-table-column>
              <el-table-column
                prop="profit"
                label="利润">
              </el-table-column>
              <el-table-column
                prop="askBid"
                label="交易方向">
              </el-table-column>
              <el-table-column
                prop="dealPrice"
                label="成交均价">
              </el-table-column>
              <el-table-column
                prop="dealAmount"
                label="成交数量">
              </el-table-column>
              <el-table-column
                prop="fee"
                label="手续费">
              </el-table-column>
            </el-table>
     </el-card>
  </div>
</template>

<script>
import { getTaskDefineDetails } from '@/api/quantify/trade';


export default {
  name: 'OrderDetails',
  components: {

  },
  data() {
    return {
        percentage: 20,
        customColor: '#e6a23c',
        invest:8282828,
        profit:482722.233,
        profitRate: 3.92,
        ape: 3322,
        dealCount:2981,
        rechargeList:[],
    }
  },
  created() {
    this.getTaskDefineDetails(this.$route.query.id);
  },
  methods: {
    handleStopRobot(){

    },
    getTaskDefineDetails(id) {
        console.log(id)
        getTaskDefineDetails({task_define_id: id}).then((res) => {
            if (res) {
              this.totalAmountMin = res.data.details.total_amount_min;
              this.totalAmountMax = res.data.details.total_amount_max;
              this.userBalance = res.data.details.user_balance;
              this.symbolsOptions = res.data.details.support_currency_list.map(symbol => {
                return {symbol}
              });
            }
        })
    },
  }
}
</script>

<style lang="scss" scoped>

.label {
    color: #909090;
    font-size: 14px;
    font-weight: lighter;
}

.value {
    font-size: 20px;
    margin-top: 10px;
}

.details {
    font-size: 14px;
    .el-row {
        margin: 10px;
    }
}
</style>
