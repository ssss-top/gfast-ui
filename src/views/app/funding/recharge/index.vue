<template>
  <div class="app-container">
      <el-row :gutter="10" type="flex" class="el-row-inline">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-card shadow="never" style="padding:10px 20px 0px 0px">
               <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    USDT(Tether)<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>USDT(Tether)</el-dropdown-item>
                    <el-dropdown-item disabled>BTC(Bitcoin)</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                <el-divider></el-divider>
                <div class=recharge-info>
                    <el-row  type="flex" justify="space-between">
                        <el-col :span="6">最小充币数量</el-col>
                        <el-col :span="4" :offset="14" class="recharge-value">0.0001</el-col>
                    </el-row>
                    <el-row type="flex"  justify="space-bewteen">
                        <el-col :span="4">可用</el-col>
                        <el-col :span="4" :offset="16" class="recharge-value">0.000000001</el-col>
                    </el-row>
                    <el-row type="flex" justify="space-between">
                        <el-col :span="4">总余额</el-col>
                        <el-col :span="4" :offset="16" class="recharge-value">0.000000001</el-col>
                    </el-row>
                    <el-row>基于哪个链：</el-row>
                    <el-radio-group v-model="chainId" size="small">
                        <el-radio-button v-for="item in chainList" :key="item.id" :label="item.name" :disabled="item.disabled"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <el-card shadow="never" style="height:100%;">
                <label>{{rechargeSymbol}}({{chainName}})地址:</label>
                <el-row style="margin-top:10px;">
                    <el-col :xs="24" :sm="24" :md="21" :lg="21" :xl="21"><span class="address">{{address}}</span></el-col>
                    <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3"><el-button round size="mini" style="color:#2c75ff;font-weight: bold;">复制地址</el-button></el-col>
                </el-row>
                <p>
                    温馨提示：
                </p>
                <div class="text-wrapper">{{tips}}</div>
            </el-card>
        </el-col>
    </el-row>

     <el-card class="box-card" shadow="never" style="margin-top:20px;">
        <h2>充值记录</h2>
          <!-- 充值记录列表 -->
            <el-table
              :header-cell-style="{background:'#fff'}"
              :data="rechargeList"
              style="width: 100%">
              <el-table-column
                prop="symbol"
                label="币种">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="createdAt"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
              <el-table-column
                prop="transferId"
                label="转账ID ">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态">
              </el-table-column>
            </el-table>
     </el-card>
  </div>
</template>

<script>

export default {
  name: 'ProfileAnalysis',
  components: {

  },
  data() {
    return {
        chainId:'',
        rechargeList:[],
        rechargeSymbol: "USDT",
        chainName:"TRC20",
        address:"",
        tips:"",
        rechargeValuation:[{
         value:"USDT",
         label:"USDT",
     },{
         value:"BTC",
         label:"BTC",
     }],
        chainList:[{
            id:1,
            name: "TRC20",
            disabled: false,
        },
        {
            id:2,
            name: "ERC20",
            disabled: true,
        },
        {
            id:3,
            name: "BEP20(BSC)",
            disabled: true,
        },
        {
            id:4,
            name: "HECO",
            disabled: true,
        }
        ]
    }
  },
  created(){
      this.chainId = 'TRC20';
      this.address = "TNq1HXauKyZGutP4LmseyenqJYnnG5wJVS";
      this.tips = "请确认只把USDT(TRC20)发送到这个地址。如果把其他的币发送到这个地址，将无法找回且不会赔付。在30个区块确认后将确认为充币成功。充币成功之后，你的资产会被转账至币安或火币 Global存储。\n\n USDT（TRC20）暂不支持智能合约充币。";
  },
  methods: {
      GetRechargeCoin(){

      }
  }
}
</script>

<style lang="scss" scoped>
.el-row-inline {
    display: flex;
    flex-wrap: wrap;
}

.address {
    display:inline-block;
    padding:0 10px;
    font-weight: bold;
    color: #5793f1;
}

p, .text-wrapper {
    font-size: 13px;
    color: #333333;
}

.text-wrapper {
    white-space: pre-wrap;
}

.recharge-info {
    padding-right: 20px;
    font-size: 14px;
    color: #333333;

    .recharge-value {
        font-weight: bold;
    }
}

.recharge-info > * {
    margin-top: 10px;
    margin-left: 5px;
    padding: 0px;
}

</style>
