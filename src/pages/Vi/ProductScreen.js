import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Item1 from '../../assets/Product-Screen/Item1.jpg';
import Item2 from '../../assets/Product-Screen/Item2.jpg';
import Item3 from '../../assets/Product-Screen/Item3.webp';
import Item4 from '../../assets/Product-Screen/Item4.webp';
import { CartContext } from "../../context/CartContext"; // Import hook từ CartContext
import { BookmarkContext } from "../../context/BookmarkContext.js";

const storageOptions = ["256GB", "512GB", "1T"];


const ProductScreen = ({ route }) => {
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
    { label: 'Tính năng camera', value: 'Ảnh Raw, Dolby Vision, Deep Fusion, Photonic Engine, v.v.' },
  ]

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(storageOptions[0]);
  const [activeTab, setActiveTab] = useState('specs');
  const { addToCart } = useContext(CartContext); // Sử dụng hook từ CartContext
  const { addBookmark, bookmarks, removeBookmark } = useContext(BookmarkContext); // Sử dụng hook từ BookmarkContext
  const isBookmarked = bookmarks.some(item => item.id === id);

  // Hàm xử lý bookmark
const handleBookmark = () => {
    if (isBookmarked) {
        removeBookmark(id);
    } else {
        addBookmark({ id, title, image, price });
    }
};

  const renderSpecs = () => (
    <View style={styles.specsContainer}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20, marginBottom: 15 }}>Cấu hình và bộ nhớ</Text>
      {Configuration.map((item, index) => (
        <View key={index} style={styles.specItem}>
          <Text style={[styles.specLabel, { marginLeft: 20, fontSize: 14, fontWeight: 500 }]}>{item.label}</Text>
          <Text style={[styles.specValue, { textAlign: 'left', marginLeft: 10, fontSize: 14, fontWeight: 400 }]}>{item.value}</Text>
        </View>
      ))}
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20, marginBottom: 15 }}>Camera và Màn hình</Text>
      {Camera.map((item, index) => (
        <View key={index} style={styles.specItem}>
          <Text style={[styles.specLabel, { marginLeft: 20, fontSize: 14, fontWeight: 500 }]}>{item.label}</Text>
          <Text style={[styles.specValue, { textAlign: 'left', marginLeft: 10, fontSize: 14, fontWeight: 400 }]}>{item.value}</Text>
        </View>
      ))}
      <TouchableOpacity>
        <Text style={[styles.buyButtonText, { color: '#0073FF', alignSelf: 'center', marginTop: 20, fontSize: 18 }]}>Xem thêm</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddToCart = () => {
    addToCart({
      id: id || title, // Nếu không có id thì dùng title
      title,
      image,
      price,
      color: selectedColor,
      storage: selectedStorage,
    });
    Alert.alert("Đã thêm vào giỏ hàng!");
  };

  

  // Dữ liệu mẫu cho đánh giá
  const reviews = [
    {
      user: "HauBro",
      date: "29/2/2025",
      content:
        "Thấy xài cũng được, mình chỉ mang tính chất nhận xu.",
      images: [
        Item1,
        Item2,
      ],
    },
    {
      user: "Hậu Bờ Rồ",
      date: "29/2/2025",
      content:
        "Năm nào cũng lên đời sớm 2 cái 1 cho vợ, 1 cho bạn bè. iPhone là nhất nhé mấy ní.",
      images: [
        Item4,
        Item3,
      ],
    },
    {
      user: "Trả góp xong đổi tên",
      date: "29/2/2025",
      content:
        "Làm còng lưng mấy tháng mới mua nổi cái điện thoại mà êm nha, nhiệt tình dễ thương.",
      images: [],
    },
  ];

  const renderReviews = () => (
    <View style={styles.reviewsSection}>
      {/* Điểm trung bình và biểu đồ */}
      <View style={styles.overallRating}>
        <Text style={styles.avgRating}>{rating}</Text>
        <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
        <Text style={styles.ratingCount}>{ratingCount} đánh giá</Text>

        {[5, 4, 3, 2, 1].map((star) => (
          <View key={star} style={styles.ratingRow}>
            <Text>{star}</Text>
            <View style={styles.ratingBarBg}>
              <View
                style={[
                  styles.ratingBarFill,
                  { width: star === 5 ? "96%" : star === 4 ? "3%" : star === 3 ? "1%" : "0%" },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Danh sách đánh giá */}
      {reviews.map((review, index) => (
        <View key={index} style={styles.reviewItem}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={styles.reviewUser}>{review.user} </Text>
            <Text style={styles.reviewDate}>({review.date})</Text>
          </ View>
          <Text>⭐⭐⭐⭐⭐</Text>
          <Text style={styles.reviewContent}>{review.content}</Text>

          {/* Hình ảnh đánh giá */}
          <View style={styles.reviewImagesContainer}>
            {review.images.map((img, i) => (
              <Image key={i} source={img} style={styles.reviewImage} />
            ))}
          </View>
          <View style={styles.divider} />
        </View>
      ))}
      {/* Nút xem thêm và viết đánh giá */}
      <TouchableOpacity style={styles.reviewButton}>
        <Text style={[styles.reviewButtonText, { color: '#247CFF' }]}>Xem thêm đánh giá</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.reviewButton, { backgroundColor: "#247CFF", }]}>
        <Text style={[styles.reviewButtonText]}>Viết đánh giá</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <LinearGradient
          colors={["#FFFFFF", "#90E0EF", "#3E77BE"]}
          style={styles.gradientBackground}
        />
        <Image source={{ uri: image }} style={[styles.productImage]} />
        <View style={{position: "absolute", flexDirection: "row", alignItems: "center", gap: 20, zIndex: 2, bottom: 20, left: 30, }}>
          <Icon
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={30}
            color="#0073FF"
            style={{ marginRight: 5, position: "relative", borderColor: "#FFFFFF", borderWidth: 1, borderRadius: 50, padding: 5, backgroundColor: "#FFFFFF" }}
            onPress={handleBookmark}
          />
          <Icon
            name="bag-outline"
            size={30}
            color="#0073FF"
            style={{ borderColor: "#FFFFFF", borderWidth: 1, borderRadius: 50, padding: 5, backgroundColor: "#FFFFFF"}}
            onPress={() => Alert.alert("Đã thêm sản phẩm vào giỏ hàng!")}
          />
          <Icon
            name="share-social-outline"
            size={30}
            color="#0073FF"
            style={{ borderColor: "#FFFFFF", borderWidth: 1, borderRadius: 50, padding: 5, backgroundColor: "#FFFFFF"}}
            onPress={() => Alert.alert("Chia sẻ sản phẩm này với bạn bè!")}
          />
          
        </View>

      </View>
      <View style={styles.section}>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={styles.discountPrice}>{price}đ</Text>
        <Text style={{ color: "#938A8A" }}>(Đã bao gồm VAT)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Tùy chọn màu sắc</Text>
        <View style={styles.colorContainer}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                {
                  backgroundColor: color,
                  borderWidth: selectedColor === color ? 2 : 0,
                  borderColor: "#0073FF",
                },
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Tùy chọn bộ nhớ</Text>
        <View style={styles.storageContainer}>
          {storageOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.storageButton,
                selectedStorage === option && styles.storageButtonSelected,
              ]}
              onPress={() => setSelectedStorage(option)}
            >
              <Text
                style={[
                  styles.storageText,
                  selectedStorage === option && { color: "#fff" },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={[styles.buyButton, { backgroundColor: "#0073FF", }]}>
        <Text style={styles.buyButtonText}>Mua Ngay</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddToCart}>
        <Text style={[styles.buyButtonText, { color: "#0171E3", textAlign: "center", marginTop: 10, fontSize: 15 }]}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>

      {/* Tabs: Thông số kỹ thuật - Đánh giá */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setActiveTab('specs')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'specs' && { color: "#0171E3", fontWeight: "bold" }
            ]}
          >
            Thông số kỹ thuật
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('reviews')}>
          <Text
            style={[
              styles.tabText, { marginRight: 20 },
              activeTab === 'reviews' && { color: "#0171E3", fontWeight: "bold" }
            ]}
          >
            Bài đánh giá
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'specs' ? renderSpecs() : renderReviews()}


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    position: "absolute",
    top: 0,
    left: 0,
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
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 407,
    height: 50,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabText: {
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
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
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
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 90,
  },
  imageContainer: {
    height: 500,
    position: "relative",
    backgroundColor: "#fff",
    marginBottom: 20,
  },

});

export default ProductScreen;
