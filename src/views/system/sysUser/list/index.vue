<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">    
      <el-form-item label="用户名" prop="userName">
        <el-input
            v-model="queryParams.userName"
            placeholder="请输入用户名"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label="中国手机不带国家代码，国际手机号格式为：国家代码-手机号" prop="mobile">
        <el-input
            v-model="queryParams.mobile"
            placeholder="请输入中国手机不带国家代码，国际手机号格式为：国家代码-手机号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label="用户昵称" prop="userNickname">
        <el-input
            v-model="queryParams.userNickname"
            placeholder="请输入用户昵称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label="生日" prop="birthday">
        <el-input
            v-model="queryParams.birthday"
            placeholder="请输入生日"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label="登录密码;cmf_password加密" prop="userPassword">
        <el-input
            v-model="queryParams.userPassword"
            placeholder="请输入登录密码;cmf_password加密"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label="加密盐" prop="userSalt">
        <el-input
            v-model="queryParams.userSalt"
            placeholder="请输入加密盐"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
        <el-form-item label="用户状态;0:禁用,1:正常,2:未验证" prop="userStatus">
          <el-select v-model="queryParams.userStatus" placeholder="请选择用户状态;0:禁用,1:正常,2:未验证" clearable size="small">
              <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>    
      <el-form-item label="用户登录邮箱" prop="userEmail">
        <el-input
            v-model="queryParams.userEmail"
            placeholder="请输入用户登录邮箱"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
        <el-form-item label="性别;0:保密,1:男,2:女" prop="sex">
          <el-select v-model="queryParams.sex" placeholder="请选择性别;0:保密,1:男,2:女" clearable size="small">
              <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>    
      <el-form-item label="用户头像" prop="avatar">
        <el-input
            v-model="queryParams.avatar"
            placeholder="请输入用户头像"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label="部门id" prop="deptId">
        <el-input
            v-model="queryParams.deptId"
            placeholder="请输入部门id"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label="是否后台管理员 1 是  0   否" prop="isAdmin">
        <el-input
            v-model="queryParams.isAdmin"
            placeholder="请输入是否后台管理员 1 是  0   否"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label="联系地址" prop="address">
        <el-input
            v-model="queryParams.address"
            placeholder="请输入联系地址"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label=" 描述信息" prop="describe">
        <el-input
            v-model="queryParams.describe"
            placeholder="请输入 描述信息"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label="联系电话" prop="phoneNum">
        <el-input
            v-model="queryParams.phoneNum"
            placeholder="请输入联系电话"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label=" 全局 uuid" prop="uuid">
        <el-input
            v-model="queryParams.uuid"
            placeholder="请输入 全局 uuid"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label="最后登录ip" prop="lastLoginIp">
        <el-input
            v-model="queryParams.lastLoginIp"
            placeholder="请输入最后登录ip"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>    
      <el-form-item label="最后登录时间" prop="lastLoginTime">
        <el-date-picker
            clearable size="small" style="width: 200px"
            v-model="queryParams.lastLoginTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择最后登录时间">
        </el-date-picker>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system/sysUser/add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system/sysUser/edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system/sysUser/delete']"
        >删除</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="sysUserList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />      
      <el-table-column label="" align="center" prop="id" />      
      <el-table-column label="用户名" align="center" prop="userName" />      
      <el-table-column label="中国手机不带国家代码，国际手机号格式为：国家代码-手机号" align="center" prop="mobile" />      
      <el-table-column label="用户昵称" align="center" prop="userNickname" />      
      <el-table-column label="生日" align="center" prop="birthday" />      
      <el-table-column label="登录密码;cmf_password加密" align="center" prop="userPassword" />      
      <el-table-column label="加密盐" align="center" prop="userSalt" />      
      <el-table-column label="用户状态;0:禁用,1:正常,2:未验证" align="center">
        <template slot-scope="scope">
            <el-switch
              v-model="scope.row.userStatus"
              :active-value="1"
              :inactive-value="0"
              @change="userStatusChange(scope.row)"
            ></el-switch>
        </template>
      </el-table-column>      
      <el-table-column label="用户登录邮箱" align="center" prop="userEmail" />      
      <el-table-column label="性别;0:保密,1:男,2:女" align="center" prop="sex" />      
      <el-table-column label="用户头像" align="center" prop="avatar" />      
      <el-table-column label="部门id" align="center" prop="deptId" />      
      <el-table-column label="备注" align="center" prop="remark" />      
      <el-table-column label="是否后台管理员 1 是  0   否" align="center" prop="isAdmin" />      
      <el-table-column label="联系地址" align="center" prop="address" />      
      <el-table-column label=" 描述信息" align="center" prop="describe" />      
      <el-table-column label="联系电话" align="center" prop="phoneNum" />      
      <el-table-column label=" 全局 uuid" align="center" prop="uuid" />      
      <el-table-column label="最后登录ip" align="center" prop="lastLoginIp" />      
      <el-table-column label="最后登录时间" align="center" prop="lastLoginTime" width="180">
        <template slot-scope="scope">
            <span>{{ parseTime(scope.row.lastLoginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>      
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system/sysUser/edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system/sysUser/delete']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加或修改用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">      
      <el-form-item label="用户名" prop="userName">
           <el-input v-model="form.userName" placeholder="请输入用户名" />
      </el-form-item>      
      <el-form-item label="中国手机不带国家代码，国际手机号格式为：国家代码-手机号" prop="mobile">
           <el-input v-model="form.mobile" placeholder="请输入中国手机不带国家代码，国际手机号格式为：国家代码-手机号" />
      </el-form-item>      
      <el-form-item label="用户昵称" prop="userNickname">
           <el-input v-model="form.userNickname" placeholder="请输入用户昵称" />
      </el-form-item>      
      <el-form-item label="生日" prop="birthday">
           <el-input v-model="form.birthday" placeholder="请输入生日" />
      </el-form-item>      
      <el-form-item label="登录密码;cmf_password加密" prop="userPassword">
           <el-input v-model="form.userPassword" placeholder="请输入登录密码;cmf_password加密" />
      </el-form-item>      
      <el-form-item label="加密盐" prop="userSalt">
           <el-input v-model="form.userSalt" placeholder="请输入加密盐" />
      </el-form-item>      
       <el-form-item label="用户状态;0:禁用,1:正常,2:未验证" prop="userStatus">
           <el-radio-group v-model="form.userStatus">
               <el-radio label="1">请选择字典生成</el-radio>
           </el-radio-group>
       </el-form-item>      
      <el-form-item label="用户登录邮箱" prop="userEmail">
           <el-input v-model="form.userEmail" placeholder="请输入用户登录邮箱" />
      </el-form-item>      
      <el-form-item label="性别;0:保密,1:男,2:女" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别;0:保密,1:男,2:女">
              <el-option label="请选择字典生成" value="" />
          </el-select>
      </el-form-item>      
      <el-form-item label="用户头像" prop="avatar">
           <el-input v-model="form.avatar" placeholder="请输入用户头像" />
      </el-form-item>      
      <el-form-item label="部门id" prop="deptId">
           <el-input v-model="form.deptId" placeholder="请输入部门id" />
      </el-form-item>      
      <el-form-item label="备注" prop="remark">
           <el-input v-model="form.remark" placeholder="请输入备注" />
      </el-form-item>      
      <el-form-item label="是否后台管理员 1 是  0   否" prop="isAdmin">
           <el-input v-model="form.isAdmin" placeholder="请输入是否后台管理员 1 是  0   否" />
      </el-form-item>      
      <el-form-item label="联系地址" prop="address">
           <el-input v-model="form.address" placeholder="请输入联系地址" />
      </el-form-item>      
      <el-form-item label=" 描述信息" prop="describe">
           <el-input v-model="form.describe" placeholder="请输入 描述信息" />
      </el-form-item>      
      <el-form-item label="联系电话" prop="phoneNum">
           <el-input v-model="form.phoneNum" placeholder="请输入联系电话" />
      </el-form-item>      
      <el-form-item label=" 全局 uuid" prop="uuid">
           <el-input v-model="form.uuid" placeholder="请输入 全局 uuid" />
      </el-form-item>      
      <el-form-item label="最后登录ip" prop="lastLoginIp">
           <el-input v-model="form.lastLoginIp" placeholder="请输入最后登录ip" />
      </el-form-item>      
       <el-form-item label="最后登录时间" prop="lastLoginTime">
           <el-date-picker clearable size="small" style="width: 200px"
               v-model="form.lastLoginTime"
               type="date"
               value-format="yyyy-MM-dd"
               placeholder="选择最后登录时间">
           </el-date-picker>
       </el-form-item>       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
    listSysUser,
    getSysUser,
    delSysUser,
    addSysUser,
    updateSysUser,    
    changeSysUserUserStatus,    
} from "@/api/system/sysUser";
export default {
  components:{},
  name: "SysUser",
  data() {
    return {
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
      // 用户表格数据
      sysUserList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,      
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        mobile: undefined,
        userNickname: undefined,
        birthday: undefined,
        userPassword: undefined,
        userSalt: undefined,
        userStatus: undefined,
        userEmail: undefined,
        sex: undefined,
        avatar: undefined,
        deptId: undefined,
        isAdmin: undefined,
        address: undefined,
        describe: undefined,
        phoneNum: undefined,
        uuid: undefined,
        lastLoginIp: undefined,
        lastLoginTime: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: { 
        userName : [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        mobile : [
          { required: true, message: "中国手机不带国家代码，国际手机号格式为：国家代码-手机号不能为空", trigger: "blur" }
        ],
        userNickname : [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
        birthday : [
          { required: true, message: "生日不能为空", trigger: "blur" }
        ],
        userPassword : [
          { required: true, message: "登录密码;cmf_password加密不能为空", trigger: "blur" }
        ],
        userSalt : [
          { required: true, message: "加密盐不能为空", trigger: "blur" }
        ],
        userStatus : [
          { required: true, message: "用户状态;0:禁用,1:正常,2:未验证不能为空", trigger: "blur" }
        ],
        userEmail : [
          { required: true, message: "用户登录邮箱不能为空", trigger: "blur" }
        ],
        sex : [
          { required: true, message: "性别;0:保密,1:男,2:女不能为空", trigger: "blur" }
        ],
        avatar : [
          { required: true, message: "用户头像不能为空", trigger: "blur" }
        ],
        deptId : [
          { required: true, message: "部门id不能为空", trigger: "blur" }
        ],
        remark : [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        isAdmin : [
          { required: true, message: "是否后台管理员 1 是  0   否不能为空", trigger: "blur" }
        ],
        address : [
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        describe : [
          { required: true, message: " 描述信息不能为空", trigger: "blur" }
        ],
        phoneNum : [
          { required: true, message: "联系电话不能为空", trigger: "blur" }
        ],
        uuid : [
          { required: true, message: " 全局 uuid不能为空", trigger: "blur" }
        ],
        lastLoginIp : [
          { required: true, message: "最后登录ip不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {    
    // 用户状态;0:禁用,1:正常,2:未验证修改
    userStatusChange(row) {
      let text = row.userStatus === 1 ? "启用" : "停用";
      this.$confirm('确认要"' + text + '"：吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeSysUserUserStatus(row.id, row.userStatus);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.userStatus =row.userStatus === 0 ?1 : 0;
        });
    },    
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listSysUser(this.queryParams).then(response => {
        this.sysUserList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },    
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {        
        id: undefined,        
        userName: undefined,        
        mobile: undefined,        
        userNickname: undefined,        
        birthday: undefined,        
        userPassword: undefined,        
        userSalt: undefined,        
        userStatus: "0" ,        
        userEmail: undefined,        
        sex: undefined,        
        avatar: undefined,        
        deptId: undefined,        
        remark: undefined,        
        isAdmin: undefined,        
        address: undefined,        
        describe: undefined,        
        phoneNum: undefined,        
        uuid: undefined,        
        lastLoginIp: undefined,        
        lastLoginTime: undefined,        
        createdAt: undefined,        
        updatedAt: undefined,        
        deletedAt: undefined,        
      };      
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSysUser(id).then(response => {
        let data = response.data;        
        data.userStatus = ''+data.userStatus        
        data.sex = ''+data.sex        
        this.form = data;
        this.open = true;
        this.title = "修改用户";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateSysUser(this.form).then(response => {
              if (response.code === 0) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addSysUser(this.form).then(response => {
              if (response.code === 0) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除用户编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delSysUser(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    }
  }
};
</script>