const mockAssets = [
    {
      id: "1",
      ownerName: "Nguyễn Văn A",
      ownerBirthYear: "1980",
      ownerIdNumber: "123456789012",
      ownerAddress: "123 Đường Lê Lợi, Quận 1, TP.HCM",
      transfereeName: "Trần Thị B",
      transfereeBirthYear: "1985",
      transfereeIdNumber: "987654321098",
      transfereeAddress: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      transferDate: "2023-05-15",
      transferFileNumber: "TN2023051501",
      landLotNumber: "L123",
      mapSheetNumber: "M456",
      landAddress: "789 Đường Trần Hưng Đạo, Quận 5, TP.HCM",
      landArea: "200 m²",
      landUseForm: "Sử dụng riêng",
      landPurpose: "Đất ở",
      landUseTerm: "Lâu dài",
      landOrigin: "Nhà nước giao có thu tiền sử dụng đất",
      houseType: "Nhà phố",
      houseAddress: "789 Đường Trần Hưng Đạo, Quận 5, TP.HCM",
      floorArea: "300 m²",
      constructionArea: "180 m²",
      houseStructure: "Bê tông cốt thép",
      houseGrade: "Cấp 2",
      numberOfFloors: "3",
      constructionYear: "2015",
      auxiliaryArea: "20 m²",
      ownershipTerm: "Lâu dài",
      notes: "Tài sản đã được đăng ký đầy đủ theo quy định của pháp luật",
      certificateNumber: "CS123456",
      certificateBookNumber: "CT01234",
      certificateIssuePlace: "Sở Tài nguyên và Môi trường TP.HCM",
      certificateIssueDate: "2023-06-01"
    },
    {
        id: "2",
        ownerName: "Lê Thị C",
        ownerBirthYear: "1975",
        ownerIdNumber: "234567890123",
        ownerAddress: "789 Đường Võ Văn Tần, Quận 3, TP.HCM",
    
        transfereeName: "Phạm Văn D",
        transfereeBirthYear: "1982",
        transfereeIdNumber: "876543210987",
        transfereeAddress: "101 Đường Nguyễn Du, Quận 1, TP.HCM",
        transferDate: "2023-04-20",
        transferFileNumber: "TN2023042002",
    
        landLotNumber: "L789",
        mapSheetNumber: "M012",
        landAddress: "202 Đường Lý Tự Trọng, Quận 1, TP.HCM",
        landArea: "150 m²",
        landUseForm: "Sử dụng riêng",
        landPurpose: "Đất ở",
        landUseTerm: "Lâu dài",
        landOrigin: "Công nhận quyền sử dụng đất",
    
        houseType: "Căn hộ chung cư",
        houseAddress: "202 Đường Lý Tự Trọng, Quận 1, TP.HCM",
        floorArea: "120 m²",
        constructionArea: "120 m²",
        houseStructure: "Bê tông cốt thép",
        houseGrade: "Cấp 1",
        numberOfFloors: "1",
        constructionYear: "2018",
        auxiliaryArea: "0 m²",
        ownershipTerm: "Lâu dài",
    
        notes: "Căn hộ nằm trong dự án chung cư cao cấp",
        certificateNumber: "CS789012",
        certificateBookNumber: "CT56789",
        certificateIssuePlace: "Sở Tài nguyên và Môi trường TP.HCM",
        certificateIssueDate: "2023-05-10",
    },
  ];
  
  const mockAssetImages = {
    "1": [
      {
        img: "https://wedo.vn/wp-content/uploads/2019/12/mau-mat-tien-nha-dep-1.jpg",
        title: "Mặt tiền nhà",
      },
      {
        img: "https://static1.cafeland.vn/cafelandnew/hinh-anh/2023/04/03/95/phong-khach-nha-pho-hien-dai-1.jpeg",
        title: "Phòng khách",
      },
      {
        img: "https://vinhtuong.com/sites/default/files/inline-images/mau-phong-bep-nha-ong-5m-8.png",
        title: "Nhà bếp",
      },
      {
        img: "https://jysk.vn/Data/Sites/1/News/2256/phong-ngu-hien-dai-sang-trong-7.png",
        title: "Phòng ngủ chính",
      },
    ],
    "2": [
      {
        img: "https://example.com/asset2_image1.jpg",
        title: "Toàn cảnh khu đất",
      },
      {
        img: "https://example.com/asset2_image2.jpg",
        title: "Mặt tiền đường",
      },
      {
        img: "https://example.com/asset2_image3.jpg",
        title: "Cảnh quan xung quanh",
      },
    ],
  };
  
  export const fetchAsset = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const asset = mockAssets.find(a => a.id === id);
        if (asset) {
          const assetWithImages = {
            ...asset,
            images: mockAssetImages[id] || []
          };
          resolve(assetWithImages);
        } else {
          resolve(null);
        }
      }, 500); // Simulate network delay
    });
  };
  
  export const fetchAllAssets = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAssets);
      }, 500); // Simulate network delay
    });
  };
  
  export const updateAsset = (id, updatedAsset) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockAssets.findIndex(a => a.id === id);
        if (index !== -1) {
          mockAssets[index] = { ...mockAssets[index], ...updatedAsset };
          resolve(mockAssets[index]);
        } else {
          resolve(null);
        }
      }, 500); // Simulate network delay
    });
  };