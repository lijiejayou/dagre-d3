<template>
  <div>
    <div style="position:absolute;margin:0 0 0 20%">
      <el-button type="primary" @click="addNode">添加节点</el-button>
      <el-button type="success" @click="editNode">编辑节点</el-button>
      <el-button type="danger" @click="deleteNode">删除节点</el-button>
    </div>

    <el-dialog title="提示" v-dialogDrag :visible.sync="dialogAddNode" width="40%">
      <el-form label-width="120px" :model="form">
        <el-form-item label="节点编号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="form.color"></el-input>
        </el-form-item>
        <el-form-item label="节点名称">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="当前父节点">
          <el-input v-model="form.source"></el-input>
        </el-form-item>
        <el-form-item label="当前节点">
          <el-input v-model="form.target"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddNode = false">取 消</el-button>
        <el-button type="primary" @click="addNodeFnc">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" v-dialogDrag :visible.sync="dialogEditNode" width="40%">
      <el-form label-width="120px" :model="code">
        <el-form-item label="节点编号">
          <el-input disabled v-model="code.id"></el-input>
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="code.color"></el-input>
        </el-form-item>
        <el-form-item label="节点名称">
          <el-input v-model="code.label"></el-input>
        </el-form-item>
        <el-form-item label="当前父节点">
          <el-input v-model="code.source"></el-input>
        </el-form-item>
        <el-form-item label="当前节点">
          <el-input v-model="code.target"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditNode = false">取 消</el-button>
        <el-button type="primary" @click="editNodeFnc">确 定</el-button>
      </span>
    </el-dialog>
    <svg width="1500" height="1000" style="background:#EBF0F6;height:1000px">
      <g />
      <rect />
    </svg>
  </div>
</template>

<script>
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
import d3Tip from './d3-tip'
export default {
  data() {
    return {
      code: '', //点击事件选中的节点
      form: {},
      dialogAddNode: false,
      dialogEditNode: false,
      list: {
        nodeInfos: [
          {
            id: 'node1',
            label: '节点1',
            color: '#2F7EF8'
          },
          {
            id: 'node2',
            label: '节点2',
            color: '#1E9FFF'
          },
          {
            id: 'node3',
            label: '节点3',
            color: 'green'
          },
          {
            id: 'node4',
            label: '节点4',
            color: '#2B9CE0'
          }
        ],
        edges: [
          {
            source: 'node1',
            target: 'node1',
            arrowhead: 'node1-node1'
          },
          {
            source: 'node1',
            target: 'node2',
            arrowhead: 'node1-node2'
          },
          {
            source: 'node2',
            target: 'node3',
            arrowhead: 'node2-node3'
          },
          {
            source: 'node2',
            target: 'node4',
            arrowhead: 'node2-node4'
          }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    //图形渲染
    init() {
      //获取D3
      var g = new dagreD3.graphlib.Graph().setGraph({
        rankdir: 'LR'    //设置流程图方向row
      })
      console.log(g)
      // 添加节点
      this.list.nodeInfos.forEach(item => {
        //item.rx = item.ry = 5 //圆角
        g.setNode(item.id, {
          label: item.label,
          labelStyle: 'fill:#ffffff', //设置字体颜色
          style: `fill:${item.color}`, //节点背景色
          shape: 'rect' //rect矩形  circle圆形   ellipse椭圆 diamond菱形
        })
      })
      // 链接关系
      this.list.edges.forEach(item => {
        g.setEdge(item.source, item.target, {
          labelStyle: 'fill:#C16E12', //设置字体颜色
          arrowheadStyle: 'fill: #47646C', //箭头颜色
          label: item.arrowhead
        })
      })
      g.nodes().forEach(function(v) {
        console.log('Node ' + v + ': ' + JSON.stringify(g.node(v)))
      })
      g.edges().forEach(function(e) {
        console.log('Edge ' + e.v + ' -> ' + e.w + ': ' + JSON.stringify(g.edge(e)))
      })
      //绘制图形
      var svg = d3.select('svg'),
        inner = svg.select('g')
      //缩放
      var zoom = d3.zoom().on('zoom', function() {
        inner.attr('transform', d3.event.transform)
      })
      svg.call(zoom)
      var render = new dagreD3.render()
      render(inner, g)
      //实现Tip
      const tip = d3Tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(c => c)
      svg.call(tip)
      //点击事件
      inner
        .selectAll('g.node')
        .on('click', e => {
          //获取点击节点信息
          let nodeData = []
          nodeData = this.list.nodeInfos.filter(item => {
            return item.id == e
          })
          this.code = nodeData[0]

          //获取当前节点及其父节点
          let edgesData = []
          edgesData = this.list.edges.filter(item => {
            return item.target == e
          })
          this.$set(this.code, 'target', edgesData[0].target)
          this.$set(this.code, 'source', edgesData[0].source)
          alert('选中数据' + JSON.stringify(this.code))
        })
        //节点的鼠标移入移出
        .on('mouseover', e => {
          let node = g.node(e)
          tip.show(`状态码：${e}<br/><br/>描述：${node.label}`)
        })
        .on('mouseout', e => {
          tip.hide(d3.event)
        })

      //动作的鼠标移入移出
      inner
        .selectAll('g.edgeLabel') //获取所有label节点
        //模拟hover
        .on('mouseover', e => {
          let edge = g.edge(e)
          tip.show(`状态更改：${e.v} 到 ${e.w}<br/><br/>动作：${edge.label}`)
        })
        .on('mouseout', e => {
          tip.hide(d3.event)
        })
        .on('click', e => {})
      var initialScale = 1.75 //设置初始缩放大小
      svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr('width') - g.graph().width * initialScale) / 2, 20).scale(initialScale))
      svg.attr('height', g.graph().height * initialScale + 40)
    },
    //添加节点确认
    addNodeFnc() {
      let { id, color, label, source, target } = this.form
      let node = { id, color, label }
      this.list.nodeInfos.push(node)
      let edges = { source, target }
      this.list.edges.push(edges)
      this.init()
      this.dialogAddNode = false
    },
    //编辑节点确认
    editNodeFnc() {
      let { id, color, label, source, target } = this.code
      for (let i = 0; i < this.list.nodeInfos.length; i++) {
        if (this.list.nodeInfos[i].id === id) {
          this.list.nodeInfos[i].color = color
          this.list.nodeInfos[i].label = label
        }
      }
      for (let i = 0; i < this.list.edges.length; i++) {
        if (this.list.edges[i].target === target) {
          this.list.edges[i].source = source
        }
      }
      this.init()
      this.dialogEditNode = false
    },
    //添加节点配置
    addNode() {
      this.dialogAddNode = true
    },
    //编辑节点
    editNode() {
      if (!this.code) {
        return this.$message.warning('请先选择节点')
      }
      this.dialogEditNode = true
    },
    //删除节点
    deleteNode() {
      if (!this.code) {
        return this.$message.warning('请先选择节点')
      }
      let { id, color, label, source, target } = this.code
      for (var i = 0; i < this.list.nodeInfos.length; i++) {
        if (this.list.nodeInfos[i].id == id) {
          this.list.nodeInfos.splice(i, 1)
        }
      }
      for (var i = 0; i < this.list.edges.length; i++) {
        if (this.list.edges[i].target == target) {
          this.list.edges.splice(i, 1)
        }
      }
      this.init()
    }
  }
}
</script>

<style lang="less">
.d3-tip {
  line-height: 1;
  padding: 6px;
  background: #fff;
  color: #333;
  font-size: 14px;
  // font-weight: bolder;
  border-radius: 2px;
  border: 1px solid #eee;
  z-index: 9999;
}
text {
  font-weight: 300;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serf;
  font-size: 14px;
}
svg {
  font-size: 14px;
}

.node rect {
  stroke: #606266;
  fill: #fff;
}

.edgePath path {
  stroke: #47646c;
  stroke-width: 1.2px;
  stroke-dasharray: 5, 5;
}
</style>