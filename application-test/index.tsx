/* url - 添加新的申请页面 */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Button, Image, Switch } from "@tarojs/components";
import styles from "./index.modules.less";
//选择经销商组件
import SelectDistributor from "./components/select-distributor";
//表单组件
import FormItem from "./components/form-item";
//底部按钮
import ApplicationBtn from "./components/application-btn";

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: "",
    navigationStyle: "custom"
  };

  state = {
    title: "FOC样品申请", //接口获取额度，额度不变
    allIntegral: 0,
    //积分额度
    integral: 0,
    itemText: [
      { leftText: "样品物号", placeholder: "请输入料号" },
      { leftText: "未税金额（元）", placeholder: "请输入最新系统面价" },
      { leftText: "样品数量（个）", placeholder: "请输入数量" }
    ],
    //传入样品料号
    itemList: [{ id: 1, name: "", money: 0, number: 0 }],
    //按钮无法点击
    disabled: false,
    //税前
    taxIncluded: 0,
    //税后
    excludingTax: 0,
    //是否折扣
    checked: false,
    sale: 10
  };

  //组件第一次渲染前
  componentWillMount() {
    //获取积分额度
    this.getIntegral();
    //打折额度
    this.getSale();
  }

  //组件第一次渲染完成
  componentDidMount() {}

  //组件即将销毁
  componentWillUnmount() {}

  //跳转别的页面时生命周期  相对于微信小程序生命周期onHide
  componentDidShow() {}

  //跳转别的页面再回来时的生命周期  相对于微信小程序生命周期onShow
  componentDidHide() {}

  render() {
    const {
      integral,
      itemText,
      itemList,
      disabled,
      taxIncluded,
      excludingTax,
      checked
    } = this.state;
    return (
      <View className={styles.application}>
        <View className={styles.applicationContent}>
          <View className={styles.applicationProduct}>
            <View className={styles.applicationTop}>
              <SelectDistributor></SelectDistributor>
              <View className={styles.integral}>
                <View className={styles.integralLeft}>
                  <Text>FOC样品积分剩余额度</Text>
                </View>
                <View className={styles.integralRight}>
                  <Text>{integral}</Text>
                </View>
              </View>
            </View>
            <View className={styles.applicationAdd}>
              {itemList.length > 0 &&
                itemList.map((list, index) => (
                  <View className={styles.addList} key={list.id}>
                    <View className={styles.addListTitle}>
                      <Text>样品物号 {index + 1}</Text>
                      {index != 0 && (
                        <Image
                          onClick={this.onDelList.bind(this, list)}
                          src={require("./images/del.png")}
                        ></Image>
                      )}
                    </View>
                    <View className={styles.addListContent}>
                      {itemText.map((item, val) => (
                        <FormItem
                          typeNumber={1}
                          key={val}
                          leftText={item.leftText}
                          placeholder={item.placeholder}
                          orderNumber={val}
                          itemContent={list}
                          handleValue={(value, orderNumber, itemContent) =>
                            this.handleValue(value, orderNumber, itemContent)
                          }
                        ></FormItem>
                      ))}
                    </View>
                  </View>
                ))}
              <Button
                disabled={disabled}
                className={styles.addListBtn}
                onClick={this.onAddList}
              >
                <Image src={require("./images/add.png")}></Image>
                <Text>添加样品料号</Text>
              </Button>
            </View>
            <View className={styles.applicationComputer}>
              <View className={styles.computedValues}>
                <Text>含税金额总计（元）</Text>
                <Text
                  className={
                    Number(taxIncluded) > 0 ? styles.applicationNumber : null
                  }
                >
                  {taxIncluded == 0 ? "自动计算" : taxIncluded}
                </Text>
              </View>
              <View className={styles.computedSwitch}>
                <Text>是否按样品折扣计算</Text>
                <Switch
                  checked={checked}
                  color="#cc0000"
                  onChange={this.onChangeSwitch}
                />
              </View>
              <View className={styles.computedValues}>
                <Text>FOC样品积分扣除</Text>
                <Text
                  className={
                    Number(excludingTax) > 0 ? styles.applicationNumber : null
                  }
                >
                  {excludingTax == 0 ? "自动计算" : excludingTax}
                </Text>
              </View>
            </View>
            <ApplicationBtn
              onApplication={num => {
                this.onApplication(num);
              }}
            ></ApplicationBtn>
          </View>
        </View>
      </View>
    );
  }

  //获取积分额度
  getIntegral() {
    this.setState({ integral: 300, allIntegral: 300 });
  }

  //获取打折值
  getSale() {
    let sale = 8 / 10;
    this.setState({ sale });
  }

  //执行更新值
  updataNumber() {
    //获取积分额度
    this.getIntegral();
    //计算值
    this.computerTaxIncluded();
  }

  //获取到值
  async handleValue(value, orderNumber, itemContent) {
    //value:input值, orderNumber:序号 itemContent:当前所在物料
    let itemList = this.state.itemList;
    //orderNumber 0.样品料号 1.未税金额（元）2.样品数量（个）

    //当前所在物料
    let orderList;
    for (var i = 0; i < itemList.length; i++) {
      //找到所在的物料
      if (itemList[i].id == itemContent.id) {
        orderList = itemList[i];
      }
    }
    orderList.id = itemContent.id;
    if (orderNumber == 0) {
      orderList.name = value;
    } else if (orderNumber == 1) {
      orderList.money = value;
    } else if (orderNumber == 2) {
      orderList.number = value;
    }

    //赋值到 itemList
    this.setState({ itemList }, () => {
      this.updataNumber();
    });
  }

  //添加新的样品申请
  onAddList = e => {
    let itemList = this.state.itemList;
    //最后一个id值
    let lastItem = itemList[itemList.length - 1].id;
    let item = { id: lastItem + 1, name: "", money: 0, number: 0 };
    itemList.push(item);
    this.setState({
      itemList
    });
  };

  //删除当前某项申请
  onDelList(list) {
    let itemList = this.state.itemList;
    for (var i = 0; i < itemList.length; i++) {
      //找到所在的物料
      if (itemList[i].id == list.id) {
        itemList.splice(i, 1);
      }
    }

    this.setState(
      {
        itemList
      },
      () => {
        this.updataNumber();
      }
    );
  }

  //是否折扣
  onChangeSwitch = e => {
    this.setState({
      checked: e.detail.value
    });
  };

  //计算税前值
  computerTaxIncluded() {
    let itemList = this.state.itemList;
    //税前值
    let taxIncluded = 0;
    for (var i = 0; i < itemList.length; i++) {
      if (itemList[i].money > 0 && itemList[i].number > 0) {
        let multiplication = itemList[i].money * itemList[i].number;
        taxIncluded = taxIncluded + multiplication;
      }
    }
    //异步更新税前值
    this.setState({ taxIncluded }, () => {
      //更新税后，额度数值
      this.updataComputerTax();
    });
  }

  //更新税后，现在额度数值
  updataComputerTax() {
    //税前值
    let taxIncluded = this.state.taxIncluded;

    if (taxIncluded > 0) {
      //总额度，不变
      let allIntegral = this.state.allIntegral;
      //税后
      let excludingTax = taxIncluded * this.state.sale;
      //现在额度
      let integral = {
        //税前现在额度
        sqIntegral: allIntegral - taxIncluded,
        //税后现在额度
        shIntegral: allIntegral - excludingTax
      };
      if (this.state.checked) {
        //如果可以税后情况
        if (integral.shIntegral >= 0) {
          //如果税后现在额度大于等于0
          this.setState({ integral: integral.shIntegral, excludingTax });
        } else {
          Taro.showToast({
            title: "当前该经销商FOC样品剩余额度不足",
            icon: "none"
          });
        }
      } else {
        //如果可以税前情况
        if (integral.sqIntegral >= 0) {
          //如果税前现在额度大于等于0
          this.setState({ integral: integral.sqIntegral });
        } else {
          Taro.showToast({
            title: "当前该经销商FOC样品剩余额度不足",
            icon: "none"
          });
        }
      }
    }
  }

  //申请更新
  async onApplication(num) {
    if (num == 1) {
      //跳转到申请记录页面
      Taro.navigateTo({
        url: "/pages/application-record/index"
      });
    } else {
      this.computerTaxIncluded();
      if (this.state.integral >= 0) {
        let url = "/pages/successful/index?success_type=2";
        Taro.navigateTo({
          url
        });
      } else {
        Taro.showToast({
          title: "当前该经销商FOC样品剩余额度不足",
          icon: "none"
        });
      }
    }
  }
}
