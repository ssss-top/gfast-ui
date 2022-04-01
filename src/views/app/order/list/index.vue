<template>
  <div class="app-container">
      <el-card class="box-card" shadow="never">
          <el-button type="primary" size="mini" @click="handleCreateOrder">创建订单</el-button>
          <!-- 机器人类型 tab 页 -->
          <el-tabs v-model="tabActiveName" @tab-click="handleTabClick" style="margin-top: 10px;">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
            <el-tab-pane v-for="item in strategyList" 
            :key="item.ID" 
            :label="item.DefineName" 
            :name="item.QuantArithCode"></el-tab-pane>
          </el-tabs>
          <!-- 机器人列表 -->
            <el-table
              :header-cell-style="{background:'#fff'}"
              :data="orderList"
              style="width: 100%">
              <el-table-column
                prop="orderName"
                label="订单名称">
              </el-table-column>
              <el-table-column
                prop="task_define_name"
                label="机器人类别">
              </el-table-column>
              <el-table-column
                prop="symbols"
                :formatter="formatSymbol"
                label="交易对">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="投资额">
              </el-table-column>
              <el-table-column
                prop="profit"
                label="利润">
              </el-table-column>
              <el-table-column
                prop="profitToday"
                label="今日利润 ">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态">
              </el-table-column>
              <el-table-column
                label="操作">
                  <template slot-scope="scope">
                  <el-button @click="handleGetRobotDetails(scope.row)" type="text" size="small">详情</el-button>
                  <el-button @click="handleStopRobot(scope.row)" type="text" size="small">停止</el-button>
                </template>
              </el-table-column>
            </el-table>
      </el-card>

    <!-- 创建或修改订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="任务名称" prop="orderName">
          <el-input v-model="form.orderName" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="策略模型" prop="strategyId">
          <el-select v-model="form.task_define_id" @change="changeTaskDefineId" >
            <el-option
              v-for="item in strategyList"
              :key="item.ID"
              :label="item.DefineName"
              :value="item.QuantArithCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
            <el-radio-group v-model="runType" size="small">
                <el-radio-button label="实盘交易"></el-radio-button>
                <el-radio-button label="模拟回测"></el-radio-button>
            </el-radio-group>
        </el-form-item>
          <el-form-item label="币种" prop="symbols" >
          <el-select v-model="form.symbols" placeholder="请选择币种" value-key="symbol" multiple clearable :style="{width: '100%'}" :multiple-limit="2">
            <el-option v-for="item in symbolsOptions" :key="item.symbol" :label="item.symbol" :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="symbols"  v-for="(item, index) in form.symbols" :key="index" :label="item.symbol">
            <el-slider
              :key="index"
              input-size="mini"
              v-model="item.rate"
              show-input>
            </el-slider>
        </el-form-item>
        <el-form-item label="投入金额" prop="amount" >
          <el-input v-model="form.amount" placeholder="请输入投入金额" />
        </el-form-item>
        <el-form-item label="可用余额" >
          {{userBalance}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">创建</el-button>
        <!-- <el-button @click="cancel">取 消</el-button> -->
      </div>
    </el-dialog>
    <!-- 创建或修改订单对话框 -->
  
  </div>
</template> 

<script>

import { getTaskDefineList, getTaskDefineDetails } from '@/api/quantify/trade';

export default {
  components:{    
  },
  name: "OrderList",
  data() {
    return {
      ///  mock data ////
        mockorderList:[{
          orderId:1,
          orderName: '测试1',
          task_define_id:'tdtd_001',
          task_define_name:"未实现_屯币宝(多币模式)",
          symbols:[{
            symbol:'BTC',
            rate:50,
          },{
            symbol: 'ETH',
            rate:30,
          },{
            symbol: 'FIL',
            rate:10,
          }],
          amount:30000,
          profit: 3043,
          profitToday: 393,
          status: 1,
        }],

        /// mock data end////
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {},
        // 表单参数
        form: {
          orderId: undefined,
          orderName:undefined,
          task_define_id: undefined,
          task_define_name: undefined,
          amount: undefined,
          symbols:undefined,
          status: undefined,
          runType:undefined,
        },
        // 表单校验
        rules: {
          orderName: [
            { required: true, message: "订单名称不能为空", trigger: "blur" }
          ],
          task_define_id: [
            { required: true, message: "策略不能为空", trigger: "blur" }
          ],
          symbols: [{
            required: true,
            type: 'array',
            message: '请至少选择一个币种',
            trigger: 'change'
          }],
          amount: [
            {required: true, max: 999, min: 2,  message: '投入金额有误', trigger: "blur" },
          ],
        },
        tabActiveName: 'all',
        symbolsOptions: [],
        totalAmountMin: 0,
        totalAmountMax: 0,
        userBalance: 0,
        strategyList:[],
        orderList:[],
        runType:'实盘交易',
    }
  },
  created(){
    this.orderList = this.mockorderList;
    this.getTaskDefineList();
    this.getTaskDefineDetails(this.strategyList[0])
  },
  methods:{
    // 表单重置
    reset() {
      this.form = {};
      this.resetForm("form");
    },
    /** 查询订单列表 */
    getList() {
      // this.loading = true;
      // this.orderList = 
      // listPost(this.queryParams).then(response => {
      //   this.postList = response.data.list;
      //   this.total = response.data.total;
      //   this.loading = false;
      // });
      // this.loading = false;
    },
    formatSymbol(row){
        return row.symbols.map(item => item.symbol);
    },
    getTaskDefineList(){
        getTaskDefineList().then((res) => {
            this.strategyList = res.data.list;
        })
    },
    getTaskDefineDetails(id) {
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
    /** 提交按钮 */ 
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.taskId != undefined) {
          // TODO: 更新订单任务
          } else {
          // TODO: 创建订单任务
              const newOrder = {
               orderName: this.form.orderName,
               task_define_id: this.form.task_define_id,
               task_define_name: this.form.task_define_id === 'tdtd_001'? "屯币宝(双币模式)": "未实现_屯币宝(多币模式)",
               amount: this.form.amount,
               symbols:this.form.symbols,
               status: 1,
             }

             this.mockorderList.push(newOrder);
             this.msgSuccess("新增成功");
             this.open = false;
             this.getList();
          }
        }
      });
    },
    handleTabClick(tab, event) {
        if (tab.name == 'all') {
           this.orderList = this.mockorderList;
           return
        }

        this.orderList = this.mockorderList.filter((item) => {
            return tab.name == item.strategyType;
        })
        
    },
    handleCreateOrder() {
      this.loading = true;
      this.reset();
      this.open = true;
      this.symbolsOptions = [];
      this.title = "创建订单";
    },
    handleGetRobotDetails(row){
      this.$router.push({path:'/app/order/details', query:{id: row.task_define_id}});
    },
    handleStopRobot(){

    },
    changeTaskDefineId() {
      this.getTaskDefineDetails(this.form.task_define_id);
    },
    handleChangeSymbols(){
      console.log(this.form.symbols)
    }
  }
};
</script>

<style lang="scss">
.block {
  font-weight: lighter;
}

</style>