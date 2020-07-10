<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="出售中商品(10)" name="first">
        <el-card shadow="always" :body-style="cardBody">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="所有分类">
              <el-select size="small" v-model="formInline.fl" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
              <el-input size="small" v-model="formInline.rolename" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
              <el-button size="small">
                导出
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-container>
              <el-main>
                <div>
                  <el-button type="primary" size="small">
                    <i class="el-icon-plus"></i> 添加商品
                  </el-button>
                  <el-button type="primary" size="small">
                    <i class="el-icon-plus"></i> 复制淘宝、天猫、1688、京东
                  </el-button>
                </div>
                <el-table
                  height="600"
                  :row-class-name="$tableBack"
                  header-cell-class-name="bjq-el-table-title-cell"
                  cell-class-name="bjq-el-table-content-cell"
                  :data="tableData"
                  border
                  style="width: 100%;margin-top:10px"
                >
                  <el-table-column prop="id" label="编号"></el-table-column>
                  <el-table-column prop="name" label="商品名称" width="500"></el-table-column>
                  <el-table-column prop="kc" label="库存"></el-table-column>
                  <el-table-column prop="xl" label="销量"></el-table-column>
                  <el-table-column prop="status" label="状态"></el-table-column>
                  <!--列表操作-->
                  <el-table-column label="操作" width="350" align="center">
                    <template slot-scope="scope">
                      <el-button style="margin: 5px;" size="mini" @click="submit(scope.row)">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-main>
              <el-footer>
                <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
              </el-footer>
            </el-container>
      </el-tab-pane>


      <el-tab-pane label="仓库中商品(5)" name="second"></el-tab-pane>
      <el-tab-pane label="已经售馨商品(0)" name="third"></el-tab-pane>
      <el-tab-pane label="商品回收站(2)" name="fourth"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      cardBody:{
        padding: '20px 20px 5px 20px' 
      },
      tableData: [
        {
          id: '01',
          name: '德尔玛家用床上除螨仪/吸尘器杀菌净化45min续航一体收纳充电CM2000白色',
          kc: 253,
          xl: 12,
          status: '上架中'
        },
        {
          id: '01',
          name: '德尔玛家用床上除螨仪/吸尘器杀菌净化45min续航一体收纳充电CM2000白色',
          kc: 253,
          xl: 12,
          status: '上架中'
        },
        {
          id: '01',
          name: '德尔玛家用床上除螨仪/吸尘器杀菌净化45min续航一体收纳充电CM2000白色',
          kc: 253,
          xl: 12,
          status: '上架中'
        },
        {
          id: '01',
          name: '德尔玛家用床上除螨仪/吸尘器杀菌净化45min续航一体收纳充电CM2000白色',
          kc: 253,
          xl: 12,
          status: '上架中'
        }
      ],
      activeName: 'first',
      formInline: {
        fl: 0
      },
      options: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '家用电器',
          value: 1
        }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {}
  }
}
</script>


<style scoped>
</style>