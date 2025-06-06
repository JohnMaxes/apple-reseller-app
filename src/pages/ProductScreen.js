import { useState, useContext, useEffect, useMemo } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Platform, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import Item1 from '../assets/Product-Screen/Item1.jpg';
import Item2 from '../assets/Product-Screen/Item2.jpg';
import Item3 from '../assets/Product-Screen/Item3.webp';
import Item4 from '../assets/Product-Screen/Item4.webp';
import Icon from 'react-native-vector-icons/Ionicons';

import { CartContext } from "../context/CartContext";
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from "../context/AuthContext";
import { getProductsByName } from "../services/product";

const screenWidth = Dimensions.get('window').width;

const ProductScreen = ({ route, navigation }) => {
  const { productName } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState('specs');
  const [showMoreSpecs, setShowMoreSpecs] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { loggedIn } = useContext(AuthContext);
  const { wishlistItems, wishlist, unwishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleStorageSelect = (storage) => {
    if(storage !== selectedStorage) {
      setSelectedStorage(storage);
      setSelectedColor(null); // Reset màu khi đổi bộ nhớ
    }
  };

  const handleColorSelect = (color) => {
    const colorObj = availableColors.find(c => c.color === color);
    if (colorObj) setSelectedColor(colorObj);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsByName(productName);
        if (response.data.status === 200) {
          setProducts(response.data.data);
          if (response.data.data.length > 0) {
            setSelectedStorage(response.data.data[0].storage);
          }
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productName]);

  // Danh sách tất cả bộ nhớ có trong sản phẩm
  const availableStorageOptions = [...new Set(products.map(p => p.storage))];
  // Nhóm các tùy chọn màu theo từng bộ nhớ (có cả color và colorBackground)
  const colorMap = useMemo(() => {
    return products.reduce((map, product) => {
      const { storage, color, colorBackground } = product;
      if (!map[storage]) map[storage] = [];
      if (!map[storage].some(c => c.color === color)) {
        map[storage].push({ color, colorBackground });
      }
      return map;
    }, {});
  }, [products]);

  // Danh sách màu theo bộ nhớ đã chọn
  const availableColors = colorMap[selectedStorage] || [];

  // Cập nhật selectedColor nếu không hợp lệ hoặc chưa chọn
  useEffect(() => {
    if (Array.isArray(availableColors) && availableColors.length > 0) {
      setSelectedColor(prev => {
        return availableColors.some(c => c.color === prev?.color) ? prev : availableColors[0];
      });
    } else setSelectedColor(null);
  }, [selectedStorage, products]);

  // Lấy sản phẩm tương ứng với selectedStorage và selectedColor
  const selectedProduct = products.find(p => p.storage === selectedStorage && p.color === selectedColor?.color);

  // Lấy hình ảnh sản phẩm tương ứng
  const imageUrls = Array.isArray(selectedProduct?.images)
    ? selectedProduct.images.map(img => img.imageUrl)
    : [];
  
  const mainImageUrl = imageUrls.length > 0 ? imageUrls[0] : undefined;

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedStorage, selectedColor]);

  // Lấy thông tin hiển thị
  const id = selectedProduct?.id || null;
  const title = selectedProduct?.productName || "";
  const price = selectedProduct?.price || "";
  const rating = selectedProduct?.rating || 0;
  const ratingCount = selectedProduct?.ratingCount || 0;
  const sku = selectedProduct?.sku || null;
  const formatPrice = (price) => { return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') };

  // Các dữ liệu cấu hình, camera giữ nguyên như cũ
  const Configuration = [
    { label: 'Hệ điều hành', value: 'iOS 18' },
    { label: 'Chip xử lý (CPU)', value: 'Apple A18 Pro 6 nhân' },
    { label: 'Chip đồ hoạ (GPU)', value: 'Apple GPU 6 nhân' },
    { label: 'RAM', value: '8GB' },
    { label: 'Dung lượng lưu trữ', value: selectedStorage || '-' },
    { label: 'Dung lượng khả dụng', value: '241GB' },
  ];
  const Camera = [
    { label: 'Camera sau', value: '48MP, 48MP và 12PP' },
    { label: 'Camera trước', value: '12MP' },
    { label: 'Độ phân giải màn hình', value: 'Super Retina XDR' },
    { label: 'Công nghệ màn hình', value: 'OLED' },
    { label: 'Quay phim camera sau', value: 'ProRes\n4K 30FPS\n4K 120FPS\n1080 60FPS\n v.v.' },
    { label: 'Tính năng camera', value: 'Ảnh Raw\nDolby Vision\nDeep Fusion\nPhotonic Engine\n v.v.' },
  ];

  // Kiểm tra sản phẩm đã có trong wishlist hay chưa
  const isWishlisted = wishlistItems.some(element => element.title === title && element.image === mainImageUrl);

  const handleWishlist = () => {
    if (!loggedIn) return navigation.navigate('Authentication');
    let item = { sku, title, image: mainImageUrl, price, rating, ratingCount };
    !isWishlisted ? wishlist(item) : unwishlist(item);
  };

  const handleAddToCart = () => {
    if (!loggedIn) {
      navigation.navigate('Authentication');
      return;
    }
    if (!selectedProduct) return;
    addToCart({
      title: title,
      storage: selectedStorage,
      color: selectedColor.color,
      price: price,
      products: products,
    });
  };

  const reviews = [
    {
      user: "HauBro",
      date: "29/2/2025",
      content: "Thấy xài cũng được, mình chỉ mang tính chất nhận xu.",
      images: [Item1, Item2],
    },
    {
      user: "Hậu Bờ Rồ",
      date: "29/2/2025",
      content: "Năm nào cũng lên đời sớm 2 cái 1 cho vợ, 1 cho bạn bè. iPhone là nhất nhé mấy ní.",
      images: [Item4, Item3],
    },
    {
      user: "Trả góp xong đổi tên",
      date: "29/2/2025",
      content: "Làm còng lưng mấy tháng mới mua nổi cái điện thoại mà êm nha, nhiệt tình dễ thương.",
      images: [],
    },
  ];

  const renderSpecs = () => (
    <View style={styles.specsContainer}>
      <>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20, marginBottom: 15 }}>Cấu hình và bộ nhớ</Text>
        {Configuration.map((item, index) => (
          <View key={index} style={styles.specItem}>
              <Text style={[styles.specLabel, {fontFamily: 'Inter', marginLeft: 20, fontSize: 14, fontWeight: 700}]}>{item.label}</Text>
              <Text style={[styles.specValue, {textAlign: 'left', marginLeft: 10, fontSize: 14, fontWeight: 400}]}>{item.value}</Text>
          </View>
        ))}
      </>
      {showMoreSpecs && (
        <>
          <Text style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: 18, marginTop: 20, marginBottom: 15 }}>Camera và Màn hình</Text>
          {Camera.map((item, index) => (
            <View key={index} style={styles.specItem}>
                <Text style={[styles.specLabel, {fontFamily: 'Inter', marginLeft: 20, fontSize: 14, fontWeight: 700}]}>{item.label}</Text>
                <Text style={[styles.specValue, {textAlign: 'left', marginLeft: 10, fontSize: 14, fontWeight: 400}]}>{item.value}</Text>
            </View>
          ))}
        </>
      )}
      <TouchableOpacity onPress={() => setShowMoreSpecs(prev => !prev)}>
        <Text style={[styles.buyButtonText, { color: '#0073FF', alignSelf: 'center', marginTop: 20, fontSize: 18 }]}>{showMoreSpecs ? 'Thu gọn' : 'Xem thêm'}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderReviews = () => (
    <View style={styles.reviewsSection}>
      {reviews.map((review, index) => (
        <View key={index} style={styles.review}>
          <Text style={styles.reviewUser}>{review.user}</Text>
          <Text style={styles.reviewDate}>{review.date}</Text>
          <Text style={styles.reviewContent}>{review.content}</Text>
          <View style={styles.reviewImages}>
            {review.images.map((img, i) => (
              <Image key={i} source={img} style={styles.reviewImage} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 30}}>
      <LinearGradient
        colors={['#003C80', '#0073FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{flex: 1}}>
          <Icon name="chevron-back" size={22} color="white" style={{marginLeft: 20}}/>        
        </TouchableOpacity>
        <View style={{flex: 5}}><Text style={styles.headerTitle}>Màn hình sản phẩm</Text></View>
        <View style={{flex: 1}}></View>
      </LinearGradient>

      <View style={styles.productInfoContainer}>
        {/* Hiển thị các hình ảnh của products với color và storage được chọn */}
        <View style={{ marginVertical: 10, alignItems: 'center' }}>
          {imageUrls.length > 0 ? (
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
                );
                setCurrentImageIndex(index);
              }}
              style={{ width: screenWidth, height: 250 }}
              contentContainerStyle={{ alignItems: 'center' }}
            >
              {imageUrls.map((url, index) => (
                <View key={index} style={{ width: screenWidth, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={{ uri: url }} resizeMode="contain"
                    style={{ width: 250, height: 250, borderRadius: 10 }}
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={{ height: 250, alignContent: 'center', justifyContent: 'center'}}>
              <Icon name="alert-circle-outline" size={40}/>
            </View>
          )}
        </View>
        <Text style={styles.productTitle}>{title}</Text>
        <Text style={styles.productPrice}>{formatPrice(price)}₫</Text>
        <Text style={{ fontWeight: '300', fontSize: 12 }}>Đã bao gồm VAT</Text>

        {/* Màu sắc */}
        <Text style={{ fontWeight: '700', fontSize: 16, marginTop: 20 }}>Tùy chọn màu sắc:</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
          {availableColors.map((colorObj) => (
            <TouchableOpacity
              key={colorObj.color}
              onPress={() => handleColorSelect(colorObj.color)}
              style={{
                backgroundColor: colorObj.colorBackground,
                width: 40,
                height: 40,
                margin: 5,
                borderRadius: 20,
                borderWidth: selectedColor?.color === colorObj.color ? 2 : 0,
                borderColor: 'blue',
                boxShadowColor: '#000',
                boxShadowOffset: { width: 0, height: 2 },
                boxShadowOpacity: 0.1,
                boxShadowRadius: 2,
                elevation: 3,
              }}
            />
          ))}
        </View>

        {/* Bộ nhớ */}
        <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 2 }}>Tùy chọn bộ nhớ:</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
          {availableStorageOptions.map((storage) => (
            <TouchableOpacity key={storage}
              onPress={() => handleStorageSelect(storage)}
              style={{
                padding: 10,
                margin: 5,
                borderWidth: selectedStorage === storage ? 2 : 1,
                borderColor: selectedStorage === storage ? 'blue' : '#ccc',
                borderRadius: 6,
              }}
            >
              <Text>{storage}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tabs Specs / Reviews */}
        <View style={styles.tabsContainer}>
          <View style={[styles.tabElement, { backgroundColor: activeTab == 'specs' ? '#e0ecfc' : 'transparent', borderWidth: activeTab == 'specs' ? 1 : 0 }]}>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={() => setActiveTab('specs')}>
              <Text style={[ styles.tabText, activeTab === 'specs' && { color: "#0171E3", fontWeight: "bold" } ]} >
                Thông số kỹ thuật
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.tabElement, { backgroundColor: activeTab == 'reviews' ? '#e0ecfc' : 'transparent', borderWidth: activeTab == 'reviews' ? 1 : 0  }]}>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={() => setActiveTab('reviews')}>
              <Text style={[ styles.tabText, activeTab === 'reviews' && { color: "#0171E3", fontWeight: "bold" } ]} >
                Bài đánh giá
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.infoBox, styles.shadowBox]}> 
        {activeTab === 'specs' ? renderSpecs() : renderReviews()}
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={handleWishlist} style={styles.wishlistButton}>
            <Icon
              name={isWishlisted ? "bookmark" : "bookmark-outline"}
              size={30}
              color={isWishlisted ? "#007bff" : "#000"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAddToCart} style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', paddingBottom: 200 },
  header: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  productInfoContainer: {
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 320,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2364DE',
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingText: { fontWeight: '700', fontSize: 18, marginRight: 5 },
  stars: { fontSize: 18, marginRight: 5 },
  ratingCountText: { fontSize: 14, color: '#555' },
  storageContainer: { marginTop: 20 },
  optionLabel: { fontWeight: '700', fontSize: 18, marginBottom: 10 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  optionButtonSelected: {
    backgroundColor: '#0073FF',
    borderColor: '#0073FF',
  },
  optionButtonText: { color: '#333', fontWeight: '600' },
  optionButtonTextSelected: { color: 'white' },
  colorContainer: { marginTop: 20 },
  colorCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  colorCircleSelected: {
    borderWidth: 3,
    borderColor: '#0073FF',
  },
  tabsContainer: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    overflow: 'hidden'
  },
  tabElement: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 22,
    margin: 3,
    borderColor: '#0073FF', 
  },
  tabText: {
    textAlign: 'center',
    fontSize: 18,
    color: "#666",
  },
  activeTabText: {
    color: '#0073FF',
  },
  specsContainer: {
    paddingTop: 15,
    marginBottom: 20,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  specLabel: {
    fontFamily: 'Inter',
    fontWeight: 700,
    color: '#444',
    flex: 1,
  },
  specValue: {
    fontWeight: 500,
    fontFamily: 'Inter',
    flex: 1,
    textAlign: 'right',
    color: '#666',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#0073FF',
    borderRadius: 8,
    paddingVertical: 15,
    marginLeft: 15,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  wishlistButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  reviewsSection: {
    paddingTop: 15,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avgRating: {
    fontSize: 40,
    fontWeight: '700',
    marginRight: 10,
  },
  ratingStars: {
    fontSize: 30,
    marginRight: 10,
  },
  ratingCount: {
    fontSize: 16,
    color: '#555',
  },
  review: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  reviewUser: {
    fontWeight: '700',
    fontSize: 16,
  },
  reviewDate: {
    color: '#999',
    marginBottom: 5,
  },
  reviewContent: {
    fontSize: 14,
    marginBottom: 5,
  },
  reviewImages: {
    flexDirection: 'row',
  },
  reviewImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  arrowButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#F0F0F0',
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: 10,
  borderWidth: 1,
  borderColor: '#CCC',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 3,
  },
  arrowText: {
    fontSize: 20,
  },
  infoBox: {
    paddingHorizontal: 15, 
    marginTop: 10, 
    backgroundColor: 'white', 
    borderRadius: 8,
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default ProductScreen;
