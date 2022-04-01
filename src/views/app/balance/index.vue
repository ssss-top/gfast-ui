<template>
  <div class="app-container">
        <el-card class="box-card" shadow="never">
            <label class="asset">净资产估值</label>
            <el-row style="margin-top:10px">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div class="balance-amount" style="display:flex">
                        <span>{{GetCurrencySymbol()}}</span>
                        <el-select v-model="selectAssetsValuation" size="mini" @change="handleAccessChange" style="width:80px;margin:0px 10px">
                            <el-option v-for="item in assetsValuation" :key="item.value" :label="item.value" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class="button-list" style="display:flex;">
                        <el-button type="primary" size="mini" @click="handleRecharge">充值</el-button>
                        <el-button type="primary" plain size="mini" @click="handleWithdraw">提现</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>

        <!-- 资产分布 -->
        <el-card class="box-card" shadow="never" style="margin-top:10px;">
            <el-table
                :header-cell-style="{background:'#fff'}"
                :data="assetList">
                <el-table-column
                prop="symbol"
                label="币种"
                >
                </el-table-column>
                <el-table-column
                prop="balance"
                label="余额	"
                >
                </el-table-column>
                <el-table-column
                prop="rate"
                label="分布">
                </el-table-column>
            </el-table>
    </el-card>

  </div>
</template>

<script>

export default {
  name: 'Balance',
  components: {

  },
  data() {
    return {
     mockBlance:221175766.102,
 
     balance: 0,
     selectAssetsValuation:"USDT",
     assetsValuation:[{
         value:"USDT",
         label:"USDT",
     },{
         value:"BTC",
         label:"BTC",
     }],
     assetList: [{
          symbol: 'USDT',
          balance: '30430',
          rate: '60%'
        }, {
          symbol: 'BTC',
          balance: '4',
          rate: '20%'
        }, {
          symbol: 'ETH',
          balance: '23',
          rate: '10%'
        }, {
         symbol: 'FIL',
          balance: '660',
          rate: '5%'
        }]
    }
  },
  created() {
      this.balance = this.mockBlance;
  },
  methods: {
      GetCurrencySymbol() {
          if (this.selectAssetsValuation === 'BTC') {
             return "฿" + this.balance.toLocaleString()
          }else {
             return "₮" + this.balance.toLocaleString()
          }
      },
      handleRecharge(){
        this.$router.push({path:'app/funding/recharge'});
      },
      handleWithdraw(){

      },
      handleAccessChange(value) {
          if (value === 'BTC') {
              this.balance = (this.balance/39015).toFixed(4);
          }else{
              this.balance = this.mockBlance;
          }
      }
  }
}
</script>

<style lang="scss" scoped>
.balance-amount {
    font-size: 30px;
}

</style>
