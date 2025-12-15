import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../../../components/screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../navigation/types";
import { Ionicons } from "@expo/vector-icons";

interface IWasteCategory {
  title: string;
  slug: string;
  subtitle: string;
  color: string;
  icons: string[];
  content: {
    definition: string;
    managementTitle: string;
    managementMethod: string;
    steps?: string[];
  };
}

const wasteDetails: IWasteCategory[] = [
  {
    title: "Hữu cơ",
    slug: "organic",
    subtitle: "Rác được thải từ những hoạt động hằng ngày",
    color: "#3B9E3E",
    icons: ["leaf-outline", "fast-food-outline", "nutrition-outline"],
    content: {
      definition:
        "Rác hữu cơ là rác được thải từ những hoạt động hằng ngày của con người như là xây dựng sinh hoạt, sản xuất nông nghiệp, công nghiệp.\n\nLoại rác này có chứa thành phần hữu cơ, khả năng phân hủy nhanh và có thể được sử dụng để tái chế để làm phân bón dùng trong nông nghiệp.",
      managementTitle: "Cách xử lý - Chôn lấp",
      managementMethod:
        "Một trong những phương pháp đơn giản nhưng mang lại hiệu quả để xử lý rác hữu cơ là chôn lấp rác. Đây là một phương pháp có chi phí thực hiện thấp nhưng cần phải đảm bảo chôn lấp rác phải có hệ thống thu khí, thu gom rác và xử lý rác.",
      steps: [
        "Bước 1: Thu gom rác hữu cơ",
        "Bước 2: San ủi",
        "Bước 3: Phun thuốc",
        "Bước 4: Rắc vôi",
        "Bước 5: Lắp đặt theo từng lớp",
        "Bước 6: Hoàn thổ mặt bằng và tiến hành trồng cây xanh",
      ],
    },
  },
  {
    title: "Nhựa",
    slug: "plastic",
    subtitle: "Gồm chai nước, bao bì nhựa, hộp nhựa",
    color: "#347EA9",
    icons: ["water-outline", "beer-outline", "flask-outline"],
    content: {
      definition:
        "Rác thải nhựa là các loại vật liệu nhựa đã qua sử dụng, khó phân hủy và gây hại cho môi trường. Bao gồm chai PET, túi nilon, hộp đựng thực phẩm nhựa, đồ chơi nhựa. Tái chế nhựa giúp tiết kiệm tài nguyên thiên nhiên và giảm ô nhiễm.",
      managementTitle: "Cách xử lý - Tái chế",
      managementMethod:
        "Rác thải nhựa cần được thu gom, làm sạch, phân loại theo loại nhựa (PET, HDPE, PVC...) sau đó được nghiền nhỏ, nấu chảy và đúc thành các sản phẩm nhựa mới hoặc sợi tổng hợp.",
    },
  },
  {
    title: "Thủy tinh",
    slug: "glass",
    subtitle: "Chai lọ thuỷ tinh, bình ly, vỏ",
    color: "#818181",
    icons: ["wine-outline", "wine-sharp", "glasses-outline"],
    content: {
      definition:
        "Rác thải thủy tinh bao gồm chai lọ, ly cốc, và các vật dụng làm bằng thủy tinh khác. Thủy tinh là vật liệu có thể tái chế vô hạn mà không làm giảm chất lượng.",
      managementTitle: "Cách xử lý - Tái chế",
      managementMethod:
        "Thủy tinh được thu gom, làm sạch, phân loại theo màu sắc, sau đó được nghiền thành mảnh nhỏ (cullet). Cullet được nấu chảy trong lò và dùng để tạo ra các sản phẩm thủy tinh mới.",
    },
  },
  {
    title: "Giấy",
    slug: "paper",
    subtitle: "Vật liệu từ giấy như: Giấy in, hộp carton, báo cũ",
    color: "#9E9D24",
    icons: ["newspaper-outline", "document-outline", "duplicate-outline"],
    content: {
      definition:
        "Rác thải giấy là các sản phẩm từ giấy đã qua sử dụng như báo, tạp chí, hộp carton, giấy in văn phòng. Tái chế giấy giúp giảm thiểu việc chặt phá rừng và tiết kiệm năng lượng.",
      managementTitle: "Cách xử lý - Tái chế",
      managementMethod:
        "Giấy được ngâm trong nước để tạo thành bột giấy, loại bỏ mực và tạp chất. Bột giấy sau đó được ép và sấy khô để tạo ra giấy mới.",
    },
  },
  {
    title: "Nguy hại",
    slug: "hazardous",
    subtitle: "Pin, bóng đèn, bình xịt, dầu, thiết bị điện tử",
    color: "#A45454",
    icons: ["warning-outline", "flame-outline", "skull-outline"],
    content: {
      definition:
        "Rác thải nguy hại là các loại rác chứa chất độc hại, dễ cháy nổ, hoặc gây bệnh. Ví dụ: pin, ắc quy, bóng đèn huỳnh quang, hóa chất, thiết bị điện tử. Tuyệt đối không được vứt chung với rác sinh hoạt.",
      managementTitle: "Cách xử lý - Xử lý chuyên biệt",
      managementMethod:
        "Rác thải nguy hại phải được thu gom riêng biệt, vận chuyển đến các cơ sở xử lý chuyên dụng để trung hòa chất độc, thiêu hủy ở nhiệt độ cao hoặc chôn lấp an toàn theo quy định nghiêm ngặt.",
    },
  },
];

type TSortDetailProps = NativeStackScreenProps<
  HomeStackParamList,
  "SortDetail"
>;

const SortDetailScreen: React.FC<TSortDetailProps> = ({
  route,
  navigation,
}) => {
  const slug = route?.params?.slug;
  const categoryDetail = wasteDetails.find((item) => item.slug === slug);

  if (!categoryDetail) {
    return (
      <Screen>
        <View style={styles.container}>
          <Text style={styles.errorText}>
            Không tìm thấy thông tin chi tiết cho loại rác này.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View
          style={[
            styles.imagePlaceholder,
            { backgroundColor: categoryDetail.color + "30" },
          ]}
        >
          <Ionicons
            name={categoryDetail.icons[0]}
            size={80}
            color={categoryDetail.color}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {`Rác ${categoryDetail.title.toLowerCase()} là gì?`}
          </Text>
          <Text style={styles.bodyText}>
            {categoryDetail.content.definition}
          </Text>
        </View>

        {/* 5. Phần cách xử lý */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {categoryDetail.content.managementTitle}
          </Text>
          <Text style={styles.bodyText}>
            {categoryDetail.content.managementMethod}
          </Text>

          {/* 6. Các bước (Nếu có) */}
          {categoryDetail.content.steps && (
            <View style={styles.stepsContainer}>
              <Text style={styles.stepsHeader}>
                Cách phân loại rác {categoryDetail.title} gồm các bước:
              </Text>
              {categoryDetail.content.steps.map((step, index) => (
                <Text key={index} style={styles.stepText}>
                  {step}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
};

// 7. Styles cho component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContainer: {
    padding: 16,
  },
  imagePlaceholder: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  stepsContainer: {
    marginTop: 15,
  },
  stepsHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
  },
  stepText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
});

export default SortDetailScreen;
