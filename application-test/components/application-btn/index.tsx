/*  申请页面底部按钮 */
import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import styles from "./index.modules.less";

interface ApplicationBtnProps {
  /**
   * input传值
   * @memberof ApplicationBtnProps
   */
  onApplication?: any;
}

export default class ApplicationBtn extends Component<ApplicationBtnProps> {
  state = {};

  static defaultProps = {};

  //组件第一次渲染前
  componentWillMount() {}

  //组件第一次渲染完成
  componentDidMount() {}

  //组件即将销毁
  componentWillUnmount() {}

  //跳转别的页面时生命周期  相对于微信小程序生命周期onHide
  componentDidShow() {}

  //跳转别的页面再回来时的生命周期  相对于微信小程序生命周期onShow
  componentDidHide() {}

  render() {
    const { onApplication } = this.props;
    return (
      <View className={styles.applicationBtn}>
        <Button
          onClick={() => {
            onApplication(1);
          }}
        >
          申请记录
        </Button>
        <Button
          onClick={() => {
            onApplication(2);
          }}
        >
          申请
        </Button>
      </View>
    );
  }
}
