import { useState, useContext } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Platform, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import Item1 from '../assets/Product-Screen/Item1.jpg';
import Item2 from '../assets/Product-Screen/Item2.jpg';
import Item3 from '../assets/Product-Screen/Item3.webp';
import Item4 from '../assets/Product-Screen/Item4.webp';
import Icon from 'react-native-vector-icons/Ionicons';

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const storageOptions = ["256GB", "512GB", "1TB"];

const ProductScreen = ({ route, navigation }) => {
  const { id, title, image, description, price, rating, ratingCount } = route.params;
  const colors = ["#C4AB98", "#C2BCB2", "#D7D7D7", "#3C3C3D"];
  const Configuration = [
    { label: 'Hệ điều hành', value: 'iOS 18' },
    { label: 'Chip xử lý (CPU)', value: 'Apple A18 Pro 6 nhân' },
    { label: 'Chip đồ hoạ (GPU)', value: 'Apple GPU 6 nhân' },
    { label: 'RAM', value: '8GB' },
    { label: 'Dung lượng lưu trữ', value: '256GB' },
    { label: 'Dung lượng khả dụng', value: '241GB' },
    
  ];
  const Camera = [
    { label: 'Camera sau', value: '48MP, 48MP và 12PP' },
    { label: 'Camera trước', value: '12MP' },
    { label: 'Độ phân giải màn hình', value: 'Super Retina XDR' },
    { label: 'Công nghệ màn hình', value: 'OLED' },
    { label: 'Quay phim camera sau', value: 'ProRes 4K 30FPS, 4K 120FPS, 1080 60FPS, v.v.' },
    { label: 'Tính năng camera', value: 'Ảnh Raw\nDolby Vision\nDeep Fusion\nPhotonic Engine\n v.v.' },
  ]

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(storageOptions[0]);
  const [activeTab, setActiveTab] = useState('specs');

  const { wishlistItems, wishlist } = useContext(WishlistContext);
  const [isWishlisted, setIsWishlisted] = useState(wishlistItems.some(element => element.id == id));
  const { addToCart } = useContext(CartContext); // Sử dụng hook từ CartContext
  const handleWishlist = () => wishlist(
    { id, title, image, price, rating }
  );


  const renderSpecs = () => (
    <View style={styles.specsContainer}>
        <Text style= {{fontWeight: 'bold', fontSize: 16, marginTop: 20, marginBottom: 15}}>Cấu hình và bộ nhớ</Text>
        {Configuration.map((item, index) => (
            <View key={index} style={styles.specItem}>
            <Text style={[styles.specLabel, {marginLeft: 20, fontSize: 14, fontWeight: 500}]}>{item.label}</Text>
            <Text style={[styles.specValue, {textAlign: 'left', marginLeft: 10, fontSize: 14, fontWeight: 400}]}>{item.value}</Text>
            </View>
        ))}
        <Text style= {{fontWeight: 'bold', fontSize: 16, marginTop: 20, marginBottom: 15}}>Camera và Màn hình</Text>
        {Camera.map((item, index) => (
            <View key={index} style={styles.specItem}>
            <Text style={[styles.specLabel, {marginLeft: 20, fontSize: 14, fontWeight: 500}]}>{item.label}</Text>
            <Text style={[styles.specValue, {textAlign: 'left', marginLeft: 10, fontSize: 14, fontWeight: 400}]}>{item.value}</Text>
            </View>
        ))}
        <TouchableOpacity>
            <Text style={[styles.buyButtonText, {color: '#0073FF', alignSelf: 'center', marginTop: 20, fontSize: 18}]}>Xem thêm</Text>
        </TouchableOpacity>
    </View>
  );

  const handleAddToCart = () => addToCart({ id: id || title, title, image, price, color: selectedColor, storage: selectedStorage });

  const reviews = [
    {
      user: "HauBro",
      date: "29/2/2025",
      content: "Thấy xài cũng được, mình chỉ mang tính chất nhận xu.",
      images: [ Item1, Item2 ],
    },
    {
      user: "Hậu Bờ Rồ",
      date: "29/2/2025",
      content: "Năm nào cũng lên đời sớm 2 cái 1 cho vợ, 1 cho bạn bè. iPhone là nhất nhé mấy ní.",
      images: [ Item4, Item3 ],
    },
    {
      user: "Trả góp xong đổi tên",
      date: "29/2/2025",
      content: "Làm còng lưng mấy tháng mới mua nổi cái điện thoại mà êm nha, nhiệt tình dễ thương.",
      images: [],
    },
  ];

  const renderReviews = () => (
    <View style={styles.reviewsSection}>
        <View style={styles.overallRating}>
            <Text style={styles.avgRating}>{rating}</Text>
            <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.ratingCount}>{ratingCount} đánh giá</Text>
            {[5, 4, 3, 2, 1].map((star) => (
            <View key={star} style={styles.ratingRow}>
                <Text>{star}</Text>
                <View style={styles.ratingBarBg}>
                    <View style={[ styles.ratingBarFill, { width: star === 5 ? "96%" : star === 4 ? "3%" : star === 3 ? "1%" : "0%" } ]}/>
                </View>
            </View>
            ))}
        </View>

        {reviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Text style={styles.reviewUser}>{review.user} </Text>
                    <Text style={styles.reviewDate}>({review.date})</Text>
                </ View>
                <Text>⭐⭐⭐⭐⭐</Text>
                <Text style={styles.reviewContent}>{review.content}</Text>
                <View style={styles.reviewImagesContainer}>
                    { review.images.map((img, i) => (<Image key={i} source={img} style={styles.reviewImage}/>)) }
                </View>
                <View style={styles.divider} />
            </View>
        ))}
        <TouchableOpacity style={styles.reviewButton}>
            <Text style={[styles.reviewButtonText, { color: '#247CFF'}]}>Xem thêm đánh giá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.reviewButton, { backgroundColor: "#247CFF", }]}>
            <Text style={[styles.reviewButtonText]}>Viết đánh giá</Text>
        </TouchableOpacity>
    </View>
  );

  const goBack = () => navigation.goBack();

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.imageContainer, { paddingTop: Platform.select({ ios: 60, android: 40, default: 40 }) }]}>
          <TouchableOpacity style={{marginLeft: 20, zIndex: 10}} onPress={goBack}>
            <View style={styles.backIconWrapper}>
              <Icon name="chevron-back" size={22} color="#000" />
            </View>
          </TouchableOpacity>
          <LinearGradient
            colors={["#FFFFFF", "#90E0EF", "#3E77BE"]}
            style={styles.gradientBackground}
          />
          <Image source={{ uri: image }} style={[styles.productImage]} />
          <View style={{flexDirection: "row", alignItems: "center", gap: 20, zIndex: 2, bottom: 20, left: 30 }}>
            <Icon name={isWishlisted ? "bookmark" : "bookmark-outline"} size={30} color="#0073FF"
              style={{ marginRight: 5, position: "relative", borderColor: "#FFFFFF", borderWidth: 1, borderRadius: 50, padding: 5, backgroundColor: "#FFFFFF" }}
              onPress={handleWishlist}
            />
            <Icon name="bag-outline" size={30} color="#0073FF" style={{ borderColor: "#FFFFFF", borderWidth: 1, borderRadius: 50, padding: 5, backgroundColor: "#FFFFFF"}}
              onPress={() => Alert.alert("Đã thêm sản phẩm vào giỏ hàng!")}
            />
            <Icon name="share-social-outline" size={30} color="#0073FF" style={{ borderColor: "#FFFFFF", borderWidth: 1, borderRadius: 50, padding: 5, backgroundColor: "#FFFFFF"}}
              onPress={() => Alert.alert("Chia sẻ sản phẩm này với bạn bè!")}
            />
          </View>
        </View>
        <View style={styles.section}>
            <Text style={[styles.title]}>{title}</Text>
            <Text style={styles.discountPrice}>{price}đ</Text>
            <Text style={{ color: "#938A8A" }}>Đã bao gồm VAT</Text>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionLabel}>Tùy chọn màu sắc</Text>
            <View style={styles.colorContainer}>
            {colors.map((color, index) => (
                <TouchableOpacity
                key={index}
                style={[ styles.colorCircle, { backgroundColor: color, borderWidth: selectedColor === color ? 2 : 0, borderColor: "#0073FF" } ]}
                onPress={() => setSelectedColor(color)}
                />
            ))}
            </View>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionLabel}>Tùy chọn bộ nhớ</Text>
            <View style={styles.storageContainer}>
            {storageOptions.map((option, index) => (
                <TouchableOpacity onPress={() => setSelectedStorage(option)} key={index} style={[ styles.storageButton, selectedStorage === option && styles.storageButtonSelected ]}>
                <Text style={[ styles.storageText, selectedStorage === option && { color: "#fff" } ]}>
                    {option}
                </Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>

        <TouchableOpacity onPress={handleAddToCart} style={[styles.buyButton, { backgroundColor: "#0073FF", }]}>
            <Text style={styles.buyButtonText}>Mua Ngay</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddToCart}>
            <Text style={[styles.buyButtonText, { color: "#0171E3", textAlign: "center", marginTop: 10, fontSize: 15 }]}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  container: {
    paddingBottom: 100,
    backgroundColor: "#F5F5F7",
  },
  productImage: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    marginBottom: 30,
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    flexShrink: 1, // Cho phép thu nhỏ nếu cần
    lineHeight: 30, // Cho đẹp hơn nếu có nhiều dòng
  },
  discountPrice: {
    fontSize: 23,
    color: "#0171E3",
    fontWeight: "bold",
    marginTop: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: "#aaa",
    textDecorationLine: "line-through",
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  colorContainer: {
    flexDirection: "row",
    gap: 12,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#0073FF",
  },
  storageContainer: {
    flexDirection: "row",
    gap: 10,
  },
  storageButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
  },
  storageButtonSelected: {
    backgroundColor: "#0073FF",
    borderColor: "#0171E3",
  },
  storageText: {
    fontSize: 14,
  },
  buyButton: {
    marginHorizontal: 20,
    backgroundColor: "#0171E3",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
    width: 184,
    height: 46,
    justifyContent: "center",
    alignSelf: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  tabsContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    overflow: 'hidden'
  },
  tabElement: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 17,
    margin: 3,
    borderColor: '#0073FF', 
  },
  tabText: {
    textAlign: 'center',
    fontSize: 18,
    color: "#666",
  },
  ratingContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    paddingHorizontal: 20,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  reviewsSection: {
    marginVertical: 10,
  },
  overallRating: {
    alignItems: "center",
    marginBottom: 20,
  },
  avgRating: {
    fontSize: 32,
    fontWeight: "bold",
  },
  ratingStars: {
    fontSize: 20,
  },
  ratingCount: {
    color: "#888",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  ratingBarBg: {
    height: 6,
    width: "80%",
    backgroundColor: "#ddd",
    marginLeft: 6,
    borderRadius: 3,
  },
  ratingBarFill: {
    height: 6,
    backgroundColor: "#0171E3",
    borderRadius: 3,
  },
  reviewItem: {
    marginBottom: 20,
  },
  reviewUser: {
    fontWeight: "bold",
  },
  reviewContent: {
    marginTop: 5,
    fontSize: 14,
    color: "#444",
  },
  reviewImagesContainer: {
    flexDirection: "row",
    marginTop: 6,
    gap: 8,
  },
  reviewImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  reviewButton: {
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    width: 184,
    alignSelf: "center",
  },
  reviewButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  reviewDate: {
    color: "#888",
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  specsContainer: {
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
    fontWeight: 'bold',
    color: '#444',
    flex: 1,
  },
  specValue: {
    flex: 1,
    textAlign: 'right',
    color: '#666',
  },
  infoBox: {
    marginHorizontal: 20, 
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
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 90,
  },
  imageContainer: {
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});

export default ProductScreen;