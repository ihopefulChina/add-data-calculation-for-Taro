/* 选择经销商组件 - 私有 组件 */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import styles from "./index.modules.less";

interface FormItemProps {
  /**
   * 列表左边文字
   *
   * @type {string}
   * @memberof FormItemProps
   */
  leftText?: string;

  /**
   * placeholder文本
   *
   * @type {string}
   * @memberof FormItemProps
   */
  placeholder?: string;

  /**
   * input文本值
   *
   * @type {string}
   * @memberof FormItemProps
   */
  value?: string;
  /**
   * input文本值
   *
   * @type {string | number}
   * @memberof FormItemProps
   */
  orderNumber?: string | number;

  /**
   * 当前物料
   *
   * @type {any}
   * @memberof FormItemProps
   */
  itemContent?: any;

  /**
   * input传值
   * @memberof FormItemProps
   */
  handleValue?: any;
  onBlur?: any;
  /**
   * type为number
   *
   * @type {number}
   * @memberof FormItemProps
   */
  typeNumber?: number;

  /**
   * input浮动
   *
   *
   * @memberof FormItemProps
   */
  textAlign?: "right" | "left";
}

export default class FormItem extends Component<FormItemProps> {
  //组件第一次渲染前
  componentWillMount() {}

  //组件第一次渲染完成
  componentDidMount() {}

  componentWillReceiveProps() {
    // console.log(this.props.itemContent.id);
  }

  //组件即将销毁
  componentWillUnmount() {}

  //跳转别的页面时生命周期  相对于微信小程序生命周期onHide
  componentDidShow() {}

  //跳转别的页面再回来时的生命周期  相对于微信小程序生命周期onShow
  componentDidHide() {}

  static defaultProps = {
    textAlign: "right",
    handleValue: undefined,
    onBlur: undefined
  };

  render() {
    const {
      leftText,
      orderNumber,
      placeholder,
      textAlign,
      typeNumber,
      value
    } = this.props;
    return (
      <View className={styles.fromItem}>
        <View className={styles.leftText}>
          <Text>{leftText}</Text>
        </View>
        <View className={styles.rightText}>
          {typeNumber == 1 &&
            (orderNumber == 0 ? (
              <Input
                type="text"
                placeholder={placeholder}
                placeholderClass={styles.placeholder}
                onInput={this.onInput}
                style={{ textAlign }}
              />
            ) : (
              <Input
                type="number"
                placeholder={placeholder}
                placeholderClass={styles.placeholder}
                onInput={this.onInput}
                style={{ textAlign }}
              />
            ))}
          {typeNumber == 2 &&
            (orderNumber == 0 ? (
              <Input
                type="text"
                placeholder={placeholder}
                placeholderClass={styles.placeholder}
                onInput={this.onInput}
                style={{ textAlign }}
                onBlur={this.onBlur}
              />
            ) : (
              <Input
                type="number"
                placeholder={placeholder}
                placeholderClass={styles.placeholder}
                onInput={this.onInput}
                style={{ textAlign }}
                onBlur={this.onBlur}
              />
            ))}
          {typeNumber == 3 && (
            <Input
              type="text"
              placeholder={placeholder}
              placeholderClass={styles.placeholder}
              onInput={this.onInput}
              style={{ textAlign }}
              value={value}
            />
          )}
          {typeNumber == 4 &&
            (orderNumber == 0 ? (
              <Input
                type="text"
                placeholder={placeholder}
                placeholderClass={styles.placeholder}
                onInput={this.onInput}
                style={{ textAlign }}
              />
            ) : (
              <Input
                type="number"
                placeholder={placeholder}
                placeholderClass={styles.placeholder}
                onInput={this.onInput}
                style={{ textAlign }}
              />
            ))}
        </View>
      </View>
    );
  }

  //input 事件
  onInput = e => {
    let value = e.target.value;
    let orderNumber = this.props.orderNumber;
    let itemContent = this.props.itemContent;
    this.props.handleValue(value, orderNumber, itemContent);
  };

  //onBlur 事件
  onBlur = e => {
    let value = e.target.value;
    let orderNumber = this.props.orderNumber;
    this.props.onBlur(value, orderNumber);
  };
}
