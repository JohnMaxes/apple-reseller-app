import { useRef } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const slides = [
  { key: 'one', title: 'Chào mừng!', text: 'Khám phá các sản phẩm Apple chính hãng.', image: require('../assets/intro1.png'), backgroundColor: '#fff' },
  { key: 'two', title: 'Mua sắm dễ dàng', text: 'Tìm kiếm và đặt hàng chỉ với vài thao tác.', image: require('../assets/intro2.png'), backgroundColor: '#f7f7f7' },
  { key: 'three', title: 'Thanh toán an toàn', text: 'Hỗ trợ nhiều phương thức thanh toán tiện lợi.', image: require('../assets/intro3.png'), backgroundColor: '#e3f2fd' },
];

const Introduction = ({ onDone }) => {
  const sliderRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const renderPagination = (activeIndex) => (
    <View style={styles.customFooter}>
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => (
          <View key={i}
            style={[ styles.dot, { backgroundColor: i === activeIndex ? '#0073FF' : '#ccc' }, ]}
          />
        ))}
      </View>
        <TouchableOpacity style={styles.button} onPress={activeIndex < slides.length - 1 ? () => sliderRef.current.goToSlide(activeIndex + 1, true) : onDone}>
            <Text style={{textAlign: 'center', fontWeight: 700, color: 'white', fontSize: 18}}>{activeIndex < slides.length - 1 ? "Tiếp theo" : "Bắt đầu"}</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <AppIntroSlider
      ref={sliderRef}
      renderItem={renderItem}
      data={slides}
      renderPagination={renderPagination}
      showSkipButton={false}
      showNextButton={false}
      showDoneButton={false}
    />
  );
};

const styles = StyleSheet.create({
  customFooter: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    maxHeight: Dimensions.get('screen').height * 0.65,
    resizeMode: 'cover',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
    fontFamily: 'Inter',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  button: {
    width: Dimensions.get('screen').width * 0.8,
    backgroundColor: '#0073FF',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 20,
    overflow: 'hidden',
    fontWeight: 700,
    fontSize: 18,
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
    elevation: 2,
    shadowColor: '#0073FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default Introduction;