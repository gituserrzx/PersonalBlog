/*
Navicat MySQL Data Transfer

Source Server         : 192.168.2.150_3306
Source Server Version : 50725
Source Host           : 192.168.2.150:3306
Source Database       : my_blog

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-04-24 22:55:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `content` text NOT NULL,
  `views` int(11) NOT NULL,
  `tags` varchar(256) NOT NULL,
  `ctime` int(11) NOT NULL,
  `utime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_ctime` (`ctime`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES ('3', '测试', '<p>123</p>', '0', 'aaa', '1555650875', '1555650875');
INSERT INTO `blog` VALUES ('4', '测试2', '<p>牛逼</p>', '0', '111,aaa', '1555651137', '1555651137');
INSERT INTO `blog` VALUES ('6', 'aaa', '<p><img src=\"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1688631197,3554659657&amp;fm=27&amp;gp=0.jpg\" style=\"max-width:100%;\"><br></p><p>啊啊啊啊</p>', '0', 'aaa', '1555655227', '1555655227');
INSERT INTO `blog` VALUES ('7', 'PC端微信(2.6.6.28)防撤回', '<p>此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件-&gt;打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...<br></p>', '0', '微信', '1555660466', '1555660466');
INSERT INTO `blog` VALUES ('9', 'VirtualBox压缩vmdk、vagrant打包box一口气全对', '<p>如何压缩VirtualBox的虚拟机vmdk文件大小并使用vagrant package成功打包镜像box文件。环境：Windows7 vagrant1.9.5 VirtualBox4.3.12 虚拟机系统ubuntu14.04GitBash中执行命令首先vagrant ssh登录到虚拟机中sudo dd if=/dev/zero of=/EMPTY bs=1Msudo rm -f /EMPTY切换到VirtualBox安装目录，执行：&nbsp;./VBoxManage clonehd \"/c/Users/zheng/VirtualBox VMs/ubuntu_default_1525...&nbsp;&nbsp;<br></p>', '1', 'vagrantvirtualbox', '1555675701', '1555675701');
INSERT INTO `blog` VALUES ('10', '使用码云git的webhook实现生产环境代码的自动pull', '<p>普通公司小项目，传统更新线上代码是每次ftp/sftp上传，或提交到svn/git后再ssh到线上环境中去手动拉取代码，十分麻烦，虽然用上了版本控制，逼格还是不够高啊！现在的线上仓库都支持hook技术，可以很方便的实现代码的自动化管理。比如我现在使用gitee.com仓库的webhook功能，监听master分支有push动作时，可以自动通过设置的hook通知生产环境中的脚本执行git pull拉取代码，自动更新，非常方便...&nbsp;&nbsp;<br></p>', '5', 'git,webhook', '1555675756', '1555675756');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blog_id` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  `parentName` varchar(64) NOT NULL DEFAULT '0',
  `user_name` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `comment` varchar(256) NOT NULL,
  `ctime` int(11) NOT NULL,
  `utime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_blog` (`blog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '10', '-1', '\"\"', 'zx', 'zx123@qq.com', '666', '1555764214', '1555764214');
INSERT INTO `comments` VALUES ('4', '10', '-1', '\"\"', 'likai', 'likai123@qq.com', '老司机带带我', '1555768328', '1555768328');
INSERT INTO `comments` VALUES ('5', '10', '-1', '\"\"', 'likai', 'likai123@qq.com', '老司机带带我', '1555768686', '1555768686');
INSERT INTO `comments` VALUES ('6', '10', '-1', '\"\"', 'likai', 'likai123@qq.com', '老司机带带我', '1555768694', '1555768694');
INSERT INTO `comments` VALUES ('7', '10', '-1', '\"\"', 'likai', 'likai2233@qq.com', '555', '1555768733', '1555768733');
INSERT INTO `comments` VALUES ('8', '10', '-1', '\"\"', 'likai', 'likai2233@qq.com', '555', '1555768755', '1555768755');
INSERT INTO `comments` VALUES ('9', '10', '-1', '\"\"', 'likai', 'likai2233@qq.com', '555', '1555768757', '1555768757');
INSERT INTO `comments` VALUES ('10', '10', '-1', '\"\"', 'likui', 'likui2233@qq.com', '666', '1555768846', '1555768846');
INSERT INTO `comments` VALUES ('15', '10', '10', 'likui', 'zx', '112233@qq.com', '大佬带我飞', '1556009399', '1556009399');
INSERT INTO `comments` VALUES ('18', '-2', '-1', '0', 'zx', '5555@qq.com', '你好呀', '1556025966', '1556025966');
INSERT INTO `comments` VALUES ('19', '-2', '-1', '0', 'zx', '205689@qq.com', '老铁双击666', '1556026215', '1556026215');
INSERT INTO `comments` VALUES ('20', '-2', '-1', '0', 'zz', '5555@qq.com', '大哥带我飞', '1556026465', '1556026465');
INSERT INTO `comments` VALUES ('21', '-10', '-1', '0', 'zx', '20654546@qq.com', '666', '1556027081', '1556027081');
INSERT INTO `comments` VALUES ('22', '-10', '21', 'zx', 'zxx', '454654@qq.com', '666', '1556027162', '1556027162');

-- ----------------------------
-- Table structure for every_day
-- ----------------------------
DROP TABLE IF EXISTS `every_day`;
CREATE TABLE `every_day` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `ctime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_ctime` (`ctime`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of every_day
-- ----------------------------
INSERT INTO `every_day` VALUES ('21', '<div>给我一个杠杆，我能翘起整个地球。&nbsp; &nbsp; ——阿基米德</div>', '1555586794');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(64) NOT NULL,
  `ctime` int(11) NOT NULL,
  `utime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_nq` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('1', '111', '1555650521', '1555650521');
INSERT INTO `tags` VALUES ('2', 'aaa', '1555650875', '1555650875');
INSERT INTO `tags` VALUES ('3', '微信', '1555660466', '1555660466');
INSERT INTO `tags` VALUES ('4', 'horse', '1555662813', '1555662813');
INSERT INTO `tags` VALUES ('5', 'vagrantvirtualbox', '1555675701', '1555675701');
INSERT INTO `tags` VALUES ('6', 'git', '1555675756', '1555675756');
INSERT INTO `tags` VALUES ('7', 'webhook', '1555675756', '1555675756');

-- ----------------------------
-- Table structure for tag_blog_mapping
-- ----------------------------
DROP TABLE IF EXISTS `tag_blog_mapping`;
CREATE TABLE `tag_blog_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `ctime` int(11) NOT NULL,
  `utime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tagid_blogid` (`tag_id`,`blog_id`),
  KEY `index_tag_id` (`tag_id`),
  KEY `index_blog_id` (`blog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag_blog_mapping
-- ----------------------------
INSERT INTO `tag_blog_mapping` VALUES ('1', '2', '3', '1555650875', '1555650875');
INSERT INTO `tag_blog_mapping` VALUES ('2', '2', '4', '1555651138', '1555651138');
INSERT INTO `tag_blog_mapping` VALUES ('3', '1', '4', '1555651138', '1555651138');
INSERT INTO `tag_blog_mapping` VALUES ('4', '2', '6', '1555655228', '1555655228');
INSERT INTO `tag_blog_mapping` VALUES ('5', '3', '7', '1555660466', '1555660466');
INSERT INTO `tag_blog_mapping` VALUES ('6', '4', '8', '1555662813', '1555662813');
INSERT INTO `tag_blog_mapping` VALUES ('7', '5', '9', '1555675701', '1555675701');
INSERT INTO `tag_blog_mapping` VALUES ('8', '7', '10', '1555675756', '1555675756');
INSERT INTO `tag_blog_mapping` VALUES ('9', '6', '10', '1555675756', '1555675756');
