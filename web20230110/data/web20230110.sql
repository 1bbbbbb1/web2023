/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : web20230110

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 04/06/2023 09:11:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户id',
  `comment` char(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户评论',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (2, 1, '真难吃');
INSERT INTO `comment` VALUES (3, 1, '真难吃');
INSERT INTO `comment` VALUES (4, 1, '真难吃');
INSERT INTO `comment` VALUES (5, 1, '真难吃');
INSERT INTO `comment` VALUES (6, 1, '真难吃');
INSERT INTO `comment` VALUES (7, 1, '真难吃');
INSERT INTO `comment` VALUES (8, 1, '真难吃');
INSERT INTO `comment` VALUES (9, 1, '真难吃');
INSERT INTO `comment` VALUES (10, 1, '真难吃');
INSERT INTO `comment` VALUES (11, 1, '真难吃');
INSERT INTO `comment` VALUES (12, 1, '真难吃');
INSERT INTO `comment` VALUES (13, 1, '真难吃');
INSERT INTO `comment` VALUES (14, 1, '真难吃');
INSERT INTO `comment` VALUES (15, 3, '好好吃我测');
INSERT INTO `comment` VALUES (16, 3, '好好吃我测');

-- ----------------------------
-- Table structure for foods
-- ----------------------------
DROP TABLE IF EXISTS `foods`;
CREATE TABLE `foods`  (
  `food_id` int NOT NULL AUTO_INCREMENT,
  `food_name` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜名',
  `food_details` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜品描述',
  `food_ava` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜品图像URL',
  `food_coast` int NOT NULL COMMENT '菜品价格',
  `type` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型',
  `salts` int NOT NULL COMMENT '盐',
  `oil` int NOT NULL COMMENT '油',
  `Milk_products` int NOT NULL COMMENT '奶及奶制品',
  `Soybeans_and_nuts` int NOT NULL COMMENT '大豆及坚果类',
  `Animal_food` int NOT NULL COMMENT '动物性食物',
  `Vegetables` int NOT NULL COMMENT '蔬菜类',
  `Fruits` int NOT NULL COMMENT '水果类',
  `cereal` int NOT NULL COMMENT '谷类',
  `Potato` int NOT NULL COMMENT '薯类',
  PRIMARY KEY (`food_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of foods
-- ----------------------------
INSERT INTO `foods` VALUES (1, '鲍汁茄子', '膳当家鲍汁茄子上市了；职位带给您不一样的感受；鲜、香、滑、嫩时刻冲击您的味蕾，一碗茄子，三碗米饭！！', 'https://i.postimg.cc/y6J9cjTz/image.png', 23, '蔬菜类', 10, 10, 10, 10, 10, 10, 10, 10, 10);
INSERT INTO `foods` VALUES (2, '招牌黄焖鸡', '鸡肉的肉质细嫩却略有嚼头，甜汁入味，越吃越有味，越吃越想吃，就连骨头里都香飘四溢，入口回味无穷 ,香', 'https://i.postimg.cc/hvb7vy9F/image.png', 20, '肉类', 22, 22, 22, 2, 22, 2, 22, 22, 2);
INSERT INTO `foods` VALUES (3, '膳当家排骨饭', '排骨闪烁的光泽像夏雨冲洗后的橘黄玛瑙，肉质鲜美，外脆里嫩，疏爽滑口。咬一口，肉就会散掉，非常的松软。', 'https://i.postimg.cc/htHxCd45/image.png', 26, '肉类', 33, 33, 33, 33, 33, 33, 33, 3, 33);
INSERT INTO `foods` VALUES (4, '招牌牛肉拌饭', '招牌爆款，牛肉肉质鲜美，嫩滑多汁，经过煸榨的牛油香味醇厚，每一颗米饭都包裹着牛油汤汁，只需一口齿颊留', 'https://i.postimg.cc/jjJsXMZG/image.jpg', 20, '肉类', 44, 44, 44, 44, 44, 44, 44, 44, 44);
INSERT INTO `foods` VALUES (5, '蛋黄牛油拌饭', '咸蛋黄的加入丰富了牛油拌饭的口感和层次，体会咸香绵密的蛋黄和醇香浓郁的牛油在舌尖上碰撞，回味无穷。', 'https://i.postimg.cc/rp9fvknW/image.jpg', 25, '肉类', 55, 55, 55, 55, 55, 55, 55, 55, 55);
INSERT INTO `foods` VALUES (6, '牛丸汤', '汤底选用牛骨原汤  汤料精选手打牛筋丸  弹性十足，一口爆汁。', 'https://i.postimg.cc/qqccCcPK/image.jpg', 18, '肉类', 66, 66, 6, 66, 66, 66, 66, 66, 66);

-- ----------------------------
-- Table structure for historical_nutrition
-- ----------------------------
DROP TABLE IF EXISTS `historical_nutrition`;
CREATE TABLE `historical_nutrition`  (
  `user_id` int NOT NULL COMMENT '用户编号',
  `salts` int NOT NULL COMMENT '盐',
  `oil` int NOT NULL COMMENT '油',
  `Milk_products` int NOT NULL COMMENT '奶及奶制品',
  `Soybeans_and_nuts` int NOT NULL COMMENT '大豆及坚果类',
  `Animal_food` int NOT NULL COMMENT '动物性食物',
  `Vegetables` int NOT NULL COMMENT '蔬菜类',
  `Fruits` int NOT NULL COMMENT '水果类',
  `cereal` int NOT NULL COMMENT '谷类',
  `Potato` int NOT NULL COMMENT '薯类'
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of historical_nutrition
-- ----------------------------
INSERT INTO `historical_nutrition` VALUES (1, 1400, 1419, 1431, 964, 1401, 951, 1400, 796, 1006);
INSERT INTO `historical_nutrition` VALUES (4, 694, 694, 694, 454, 694, 454, 694, 394, 454);

-- ----------------------------
-- Table structure for ordered_foods
-- ----------------------------
DROP TABLE IF EXISTS `ordered_foods`;
CREATE TABLE `ordered_foods`  (
  `order_id` int NOT NULL COMMENT '订单编号',
  `food_id` int NOT NULL COMMENT '菜品ID',
  `food_nums` int NOT NULL COMMENT '菜品数量'
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of ordered_foods
-- ----------------------------
INSERT INTO `ordered_foods` VALUES (1, 1, 10);
INSERT INTO `ordered_foods` VALUES (1, 2, 12);
INSERT INTO `ordered_foods` VALUES (1, 3, 10);
INSERT INTO `ordered_foods` VALUES (2, 1, 10);
INSERT INTO `ordered_foods` VALUES (2, 2, 12);
INSERT INTO `ordered_foods` VALUES (2, 3, 10);
INSERT INTO `ordered_foods` VALUES (3, 1, 10);
INSERT INTO `ordered_foods` VALUES (3, 2, 12);
INSERT INTO `ordered_foods` VALUES (3, 3, 10);
INSERT INTO `ordered_foods` VALUES (4, 1, 10);
INSERT INTO `ordered_foods` VALUES (4, 2, 12);
INSERT INTO `ordered_foods` VALUES (4, 3, 10);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `order_id` int NOT NULL AUTO_INCREMENT COMMENT '订单编号（自增）',
  `user_id` int NOT NULL COMMENT '用户编号',
  `status` int NOT NULL COMMENT '0正在1取消2完成',
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 1, 2);
INSERT INTO `orders` VALUES (2, 1, 2);
INSERT INTO `orders` VALUES (3, 1, 1);
INSERT INTO `orders` VALUES (4, 4, 2);

-- ----------------------------
-- Table structure for total_referrals
-- ----------------------------
DROP TABLE IF EXISTS `total_referrals`;
CREATE TABLE `total_referrals`  (
  `food_id` int NOT NULL COMMENT '食物编号',
  `sum` int NOT NULL COMMENT '被推荐次数'
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of total_referrals
-- ----------------------------
INSERT INTO `total_referrals` VALUES (2, 2);
INSERT INTO `total_referrals` VALUES (3, 6);
INSERT INTO `total_referrals` VALUES (4, 5);
INSERT INTO `total_referrals` VALUES (1, 1);
INSERT INTO `total_referrals` VALUES (5, 2);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_password` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `user_name` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名称',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '7758258', 'yjs');
INSERT INTO `users` VALUES (2, '123', 'zjvivi');
INSERT INTO `users` VALUES (3, 'root', 'root');

SET FOREIGN_KEY_CHECKS = 1;
