CREATE DATABASE [SweetMouth]
use [SweetMouth]

CREATE TABLE [dbo].[Member](
	[MemberID] [int] NOT NULL primary key identity(10001,1),
	[Name] [nvarchar](50) NULL,
	[NickName] [nvarchar](50) NULL,
	[Email] [varchar](50) NULL,
	[PhoneNumber] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[BirthDay] [date] NULL)

INSERT [dbo].[Member] VALUES (N'張育剛', N'Peter', N'FERvvbvty0P@gmail.com', N'0912100521', N'a001','1954/05/12')
INSERT [dbo].[Member] VALUES (N'賴惠悅', N'Julia', N'LwxffoPPgmq@gmail.com', N'0952153625', N'a002','1957/10/09')
INSERT [dbo].[Member] VALUES (N'王大富', N'Wang', N'qk2rcmWv1a@gmail.com', N'0945126369', N'a003','2000/07/01')
INSERT [dbo].[Member] VALUES (N'林雅婷', N'採青', N'rDlIDrL385EdE@gmail.com', N'0987456123', N'a004','1999/03/21')
INSERT [dbo].[Member] VALUES (N'蔡志文', N'夏山', N'Kr5zt1eyD6JJ@gmail.com', N'0914521652', N'a005','1993/01/02')
INSERT [dbo].[Member] VALUES (N'張育南', N'逍遙', N'cLxjgOtlQ5@gmail.com', N'0988522147', N'a006','1966/12/23')
INSERT [dbo].[Member] VALUES (N'王欣儀', N'靈兒', N'rri5Ijko0k5eC@gmail.com', N'0966321581', N'a007','2002/06/02')




CREATE TABLE [dbo].[Blog](
	[Title] [nvarchar](100) NULL,
	[SubTitle] [nvarchar](100) NULL,
	[ArticleID] [int] NOT NULL,
	[Floor] [int] NOT NULL primary key([ArticleID],[Floor]),
	[MemberID] [int] NOT NULL foreign key references [dbo].[Member]([MemberID])  ,	
	[Article] [nvarchar](200) NULL,
	[Time] [datetime] NULL,
	[Image] [varchar](50))

INSERT [dbo].[Blog] ([Title],[SubTitle],[ArticleID],[Floor],[MemberID],[Article],[Time]) VALUES (N'在家自已做提拉米蘇
',N'材料準備',5002,0,10003,'dkjdsfnuidjsddfjsdfusifusjks','2023/1/4 10:40:50')
INSERT [dbo].[Blog] ([Title],[SubTitle],[ArticleID],[Floor],[MemberID],[Article],[Time]) VALUES ('sfdddd','ddxcv',5002,1,10004,'dfsdfdfcvdeddfdsdfeersrdf','2023/1/4 10:42:35')
INSERT [dbo].[Blog] ([Title],[SubTitle],[ArticleID],[Floor],[MemberID],[Article],[Time]) VALUES ('dfddfd','fdss',5003,0,10007,'djkfdjijiiipoklmljkjkjkj','2023/1/4 10:48:55')
INSERT [dbo].[Blog] ([Title],[SubTitle],[ArticleID],[Floor],[MemberID],[Article],[Time]) VALUES ('fffd','ddd',5003,1,10006,'hjkiuytfrghjkiuytrdfgjuytrdfghjytr','2023/1/5 08:32:34')
INSERT [dbo].[Blog] ([Title],[SubTitle],[ArticleID],[Floor],[MemberID],[Article],[Time]) VALUES ('vcb','wett',5002,2,10007,'ytrdfghjkiuytrfghjkiuytrfgbn','2023/1/5 09:54:36')
INSERT [dbo].[Blog] ([Title],[SubTitle],[ArticleID],[Floor],[MemberID],[Article],[Time]) VALUES ('eeees','dfd',5002,3,10002,'jiuytrdfghgtrewerfghnjmk','2023/1/5 09:55:58')
INSERT [dbo].[Blog] ([Title],[SubTitle],[ArticleID],[Floor],[MemberID],[Article],[Time]) VALUES ('dfsd','fds',5004,0,10005,'frtyuikol,mnbvcdsedrtyhujjh','2023/1/6 18:12:03')
INSERT [dbo].[Blog] ([Title],[SubTitle],[ArticleID],[Floor],[MemberID],[Article],[Time]) VALUES ('fdyj','jtyre',5004,1,10006,'fdhgjhkulopuigyfhdxghjkhyutrsdfx','2023/1/6 19:00:54')




CREATE TABLE [dbo].[Schedule](
	[Date] [date] NOT NULL primary key,
	[RentID] [int] NULL foreign key references [dbo].[Member]([MemberID]),
	[ClassID] [int] NULL,
	[ClassName] [nvarchar](50) NULL default NULL)

INSERT [dbo].[Schedule] VALUES ('2023/1/4',NULL,120001,'手做蛋糕')
INSERT [dbo].[Schedule] VALUES ('2023/1/5',NULL,120001,'餅乾')
INSERT [dbo].[Schedule] VALUES ('2023/1/6',10004,NULL,NULL)
INSERT [dbo].[Schedule] VALUES ('2023/1/7',10003,NULL,NULL)
INSERT [dbo].[Schedule] VALUES ('2023/1/9',NULL,120001,'手做蛋糕')
INSERT [dbo].[Schedule] VALUES ('2023/1/10',10007,NULL,NULL)




CREATE TABLE [dbo].[Product](
	[ProductName] [nvarchar](50) NOT NULL,
	[Specifications] [nvarchar](50) NOT NULL primary key([ProductName],[Specifications]),
	[Price] [int] NULL,
	[ImageName] [nvarchar](150) NULL,
	[Avalible] [bit] default 1)

INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'cheese餅餅', N'小罐', 120,'CheeseStick')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'cheese餅餅', N'大罐', 220,'CheeseStick')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'波卡米餅', N'罐', 200,'BokaRiceCookie')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'舔嘴杏仁餅', N'11入', 300,'almondCookie')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'蔓越莓司康', N'6入', 350,'scone')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'百香可可旅人蛋糕', N'5入', 350,'passionCocoCupCake')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'巧克力球', N'金光閃閃/10入', 250,'blackChocolate')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'巧克力球', N'粉紅泡泡/10入', 300,'redChocolate')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'天使之鈴可麗露', N'櫻桃可可/6入', 450,'canele')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'天使之鈴可麗露', N'經典原味/6入', 450,'canele')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'天使之鈴可麗露', N'綜合/6入', 450,'canele')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'泡芙', N'草莓起司/6入', 450,'puffstrawberrycheese')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'泡芙', N'伯爵茶/6入', 450,'puffearlgrey')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'泡芙', N'香草奶油/6入', 450,'puffvanilla')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'泡芙', N'香濃可可/6入', 450,'puffchocolate')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'檸檬瑪德蓮', N'6入', 270,'lemonMadeleine')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'檸夏檸檬塔', N'顆', 90,'lemonTart')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'酒鬼芭娜娜', N'小杯裝', 140,'TiramisuS')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'酒鬼芭娜娜', N'大盒裝', 520,'TiramisuL')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'酒鬼先生', N'小杯裝', 140,'TiramisuS')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'酒鬼先生', N'大盒裝', 520,'TiramisuL')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'裝熟乳酪', N'5入', 350,'cheeseCake')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'巧克力莓果塔', N'顆', 150,'chocoberryTart')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'酒漬櫻桃黑森林', N'小杯裝', 140,'cherryChocoCake')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'酒漬櫻桃黑森林', N'大盒裝', 520,'cherryChocoCake')



CREATE TABLE [dbo].[Order](
	[OrderID] [int] NOT NULL primary key identity(19001,1),
	[BuyerID] [int] NOT NULL foreign key references [dbo].[Member]([MemberID]),
	[ProductName] [nvarchar](50) NOT NULL,
	[Specifications] [nvarchar](50) NOT NULL,
	[Discount] [float] NULL,
	[Income] [float] NULL,
	[Number] [int] NOT NULL default 1,
	foreign key ([ProductName],[Specifications]) references [dbo].[Product]([ProductName],[Specifications]))

INSERT [dbo].[Order] VALUES(10005,N'天使之鈴可麗露',N'經典原味/6入',1,450,6)
INSERT [dbo].[Order] VALUES(10007,N'巧克力球',N'金光閃閃/10入',0.8,200,5)
INSERT [dbo].[Order] VALUES(10003,N'舔嘴杏仁餅',N'11入',1,300,2)
INSERT [dbo].[Order] VALUES(10002,N'酒鬼先生',N'大盒裝',1,520,1)
INSERT [dbo].[Order] VALUES(10002,N'百香可可旅人蛋糕',N'5入',1,350,4)




CREATE TABLE [dbo].[HashTag](
	[ProductName] [nvarchar](50)NOT NULL,
	[Specifications] [nvarchar](50) NOT NULL,
	[HashTag] [nvarchar](50)NOT NULL,
	foreign key ([ProductName],[Specifications]) references [dbo].[Product]([ProductName],[Specifications]),
	primary key ([ProductName],[Specifications],[HashTag]))

INSERT [dbo].[HashTag] VALUES(N'cheese餅餅',N'大罐',N'起司')
INSERT [dbo].[HashTag] VALUES(N'cheese餅餅',N'大罐',N'餅乾')
INSERT [dbo].[HashTag] VALUES(N'cheese餅餅',N'大罐',N'狗狗可食')
INSERT [dbo].[HashTag] VALUES(N'cheese餅餅',N'小罐',N'起司')
INSERT [dbo].[HashTag] VALUES(N'cheese餅餅',N'小罐',N'餅乾')
INSERT [dbo].[HashTag] VALUES(N'cheese餅餅',N'小罐',N'狗狗可食')

INSERT [dbo].[HashTag] VALUES(N'天使之鈴可麗露',N'櫻桃可可/6入',N'可麗露')
INSERT [dbo].[HashTag] VALUES(N'天使之鈴可麗露',N'櫻桃可可/6入',N'可可')
INSERT [dbo].[HashTag] VALUES(N'天使之鈴可麗露',N'櫻桃可可/6入',N'櫻桃')
INSERT [dbo].[HashTag] VALUES(N'天使之鈴可麗露',N'經典原味/6入',N'可麗露')
INSERT [dbo].[HashTag] VALUES(N'天使之鈴可麗露',N'經典原味/6入',N'香草')

INSERT [dbo].[HashTag] VALUES(N'天使之鈴可麗露',N'綜合/6入',N'可麗露')
INSERT [dbo].[HashTag] VALUES(N'天使之鈴可麗露',N'綜合/6入',N'可可')
INSERT [dbo].[HashTag] VALUES(N'天使之鈴可麗露',N'綜合/6入',N'櫻桃')
INSERT [dbo].[HashTag] VALUES(N'天使之鈴可麗露',N'綜合/6入',N'香草')

INSERT [dbo].[HashTag] VALUES(N'巧克力球',N'粉紅泡泡/10入',N'可可')
INSERT [dbo].[HashTag] VALUES(N'巧克力球',N'粉紅泡泡/10入',N'巧克力')
INSERT [dbo].[HashTag] VALUES(N'巧克力球',N'粉紅泡泡/10入',N'脆片')
INSERT [dbo].[HashTag] VALUES(N'巧克力球',N'粉紅泡泡/10入',N'莓果乾')
INSERT [dbo].[HashTag] VALUES(N'巧克力球',N'粉紅泡泡/10入',N'紅寶石巧克力')

INSERT [dbo].[HashTag] VALUES(N'巧克力球',N'金光閃閃/10入',N'可可')
INSERT [dbo].[HashTag] VALUES(N'巧克力球',N'金光閃閃/10入',N'巧克力')
INSERT [dbo].[HashTag] VALUES(N'巧克力球',N'金光閃閃/10入',N'脆片')
INSERT [dbo].[HashTag] VALUES(N'巧克力球',N'金光閃閃/10入',N'黑巧克力')
INSERT [dbo].[HashTag] VALUES(N'巧克力球',N'金光閃閃/10入',N'杏仁角')

INSERT [dbo].[HashTag] VALUES(N'巧克力莓果塔',N'顆',N'巧克力')
INSERT [dbo].[HashTag] VALUES(N'巧克力莓果塔',N'顆',N'莓果')
INSERT [dbo].[HashTag] VALUES(N'巧克力莓果塔',N'顆',N'塔')

INSERT [dbo].[HashTag] VALUES(N'檸夏檸檬塔',N'顆',N'檸檬')
INSERT [dbo].[HashTag] VALUES(N'檸夏檸檬塔',N'顆',N'塔')

INSERT [dbo].[HashTag] VALUES(N'檸檬瑪德蓮',N'6入',N'檸檬')
INSERT [dbo].[HashTag] VALUES(N'檸檬瑪德蓮',N'6入',N'瑪德蓮')

INSERT [dbo].[HashTag] VALUES(N'泡芙',N'伯爵茶/6入',N'泡芙')
INSERT [dbo].[HashTag] VALUES(N'泡芙',N'伯爵茶/6入',N'伯爵')
INSERT [dbo].[HashTag] VALUES(N'泡芙',N'伯爵茶/6入',N'含酒')

INSERT [dbo].[HashTag] VALUES(N'泡芙',N'草莓起司/6入',N'泡芙')
INSERT [dbo].[HashTag] VALUES(N'泡芙',N'香濃可可/6入',N'草莓')

INSERT [dbo].[HashTag] VALUES(N'波卡米餅',N'罐',N'寶寶')
INSERT [dbo].[HashTag] VALUES(N'波卡米餅',N'罐',N'米餅')
INSERT [dbo].[HashTag] VALUES(N'波卡米餅',N'罐',N'餅乾')
INSERT [dbo].[HashTag] VALUES(N'波卡米餅',N'罐',N'狗狗可食')

INSERT [dbo].[HashTag] VALUES(N'百香可可旅人蛋糕',N'5入',N'可可')
INSERT [dbo].[HashTag] VALUES(N'百香可可旅人蛋糕',N'5入',N'巧克力')
INSERT [dbo].[HashTag] VALUES(N'百香可可旅人蛋糕',N'5入',N'百香果')
INSERT [dbo].[HashTag] VALUES(N'百香可可旅人蛋糕',N'5入',N'杯子蛋糕')

INSERT [dbo].[HashTag] VALUES(N'舔嘴杏仁餅',N'11入',N'杏仁')
INSERT [dbo].[HashTag] VALUES(N'舔嘴杏仁餅',N'11入',N'餅乾')

INSERT [dbo].[HashTag] VALUES(N'蔓越莓司康',N'6入',N'蔓越莓')
INSERT [dbo].[HashTag] VALUES(N'蔓越莓司康',N'6入',N'司康')

INSERT [dbo].[HashTag] VALUES(N'裝熟乳酪',N'5入',N'乳酪')
INSERT [dbo].[HashTag] VALUES(N'裝熟乳酪',N'5入',N'乳酪蛋糕')

INSERT [dbo].[HashTag] VALUES(N'酒漬櫻桃黑森林',N'大盒裝',N'酒漬')
INSERT [dbo].[HashTag] VALUES(N'酒漬櫻桃黑森林',N'大盒裝',N'櫻桃')
INSERT [dbo].[HashTag] VALUES(N'酒漬櫻桃黑森林',N'大盒裝',N'黑森林')
INSERT [dbo].[HashTag] VALUES(N'酒漬櫻桃黑森林',N'大盒裝',N'巧克力')
INSERT [dbo].[HashTag] VALUES(N'酒漬櫻桃黑森林',N'大盒裝',N'提拉米蘇')

INSERT [dbo].[HashTag] VALUES(N'酒漬櫻桃黑森林',N'小杯裝',N'酒漬')
INSERT [dbo].[HashTag] VALUES(N'酒漬櫻桃黑森林',N'小杯裝',N'櫻桃')
INSERT [dbo].[HashTag] VALUES(N'酒漬櫻桃黑森林',N'小杯裝',N'黑森林')
INSERT [dbo].[HashTag] VALUES(N'酒漬櫻桃黑森林',N'小杯裝',N'巧克力')
INSERT [dbo].[HashTag] VALUES(N'酒漬櫻桃黑森林',N'小杯裝',N'提拉米蘇')

INSERT [dbo].[HashTag] VALUES(N'酒鬼先生',N'大盒裝',N'提拉米蘇')
INSERT [dbo].[HashTag] VALUES(N'酒鬼先生',N'大盒裝',N'含酒')

INSERT [dbo].[HashTag] VALUES(N'酒鬼先生',N'小杯裝',N'提拉米蘇')
INSERT [dbo].[HashTag] VALUES(N'酒鬼先生',N'小杯裝',N'含酒')

INSERT [dbo].[HashTag] VALUES(N'酒鬼芭娜娜',N'大盒裝',N'香蕉')
INSERT [dbo].[HashTag] VALUES(N'酒鬼芭娜娜',N'大盒裝',N'提拉米蘇')
INSERT [dbo].[HashTag] VALUES(N'酒鬼芭娜娜',N'大盒裝',N'含酒')

INSERT [dbo].[HashTag] VALUES(N'酒鬼芭娜娜',N'小杯裝',N'香蕉')
INSERT [dbo].[HashTag] VALUES(N'酒鬼芭娜娜',N'小杯裝',N'提拉米蘇')
INSERT [dbo].[HashTag] VALUES(N'酒鬼芭娜娜',N'小杯裝',N'含酒')
