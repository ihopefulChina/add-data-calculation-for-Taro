/* 选择经销商组件 - 私有 组件 */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import styles from "./index.modules.less";
import MMIconFont from "~/modules/@wmeimob/taro-design/src/components/icon-font/index";
import MMIconFontName from "~/modules/@wmeimob/taro-design/src/components/icon-font/const";

export default class SelectDistributor extends Component {
  state = { name: "" };

  //组件第一次渲染前
  componentWillMount() {}

  //组件第一次渲染完成
  componentDidMount() {}

  //组件即将销毁
  componentWillUnmount() {}

  //跳转别的页面时生命周期  相对于微信小程序生命周期onHide
  componentDidShow() {
    const app = Taro.getApp();
    const distributor = app.globalData.distributor;
    if (distributor) {
      this.setState({ name: distributor.name });
    }
  }

  //跳转别的页面再回来时的生命周期  相对于微信小程序生命周期onShow
  componentDidHide() {}

  render() {
    const { name } = this.state;
    return (
      <View className={styles.selectDistributor}>
        <View className={styles.contentLeft}>
          <Text>经销商</Text>
        </View>
        <View className={styles.contentRight} onClick={this.onNavigateTo}>
          <Text>{name}</Text>
          <MMIconFont value={MMIconFontName.Next} size={10} color="#231916" />
        </View>
      </View>
    );
  }

  //跳转到搜索经销商页面
  onNavigateTo() {
    //选择经销商
    Taro.navigateTo({
      url: "/pages/search/index?type=2"
    });
  }
}
