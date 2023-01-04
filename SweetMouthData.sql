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

INSERT [dbo].[Member] VALUES (N'�i�|��', N'Peter', N'FERvvbvty0P@gmail.com', N'0912100521', N'a001','1954/05/12')
INSERT [dbo].[Member] VALUES (N'��f��', N'Julia', N'LwxffoPPgmq@gmail.com', N'0952153625', N'a002','1957/10/09')
INSERT [dbo].[Member] VALUES (N'���j�I', N'Wang', N'qk2rcmWv1a@gmail.com', N'0945126369', N'a003','2000/07/01')
INSERT [dbo].[Member] VALUES (N'�L���@', N'�īC', N'rDlIDrL385EdE@gmail.com', N'0987456123', N'a004','1999/03/21')
INSERT [dbo].[Member] VALUES (N'���Ӥ�', N'�L�s', N'Kr5zt1eyD6JJ@gmail.com', N'0914521652', N'a005','1993/01/02')
INSERT [dbo].[Member] VALUES (N'�i�|�n', N'�p��', N'cLxjgOtlQ5@gmail.com', N'0988522147', N'a006','1966/12/23')
INSERT [dbo].[Member] VALUES (N'���Y��', N'�F��', N'rri5Ijko0k5eC@gmail.com', N'0966321581', N'a007','2002/06/02')




CREATE TABLE [dbo].[Blog](
	[Title] [nvarchar](100) NULL,
	[SubTitle] [nvarchar](100) NULL,
	[ArticleID] [int] NOT NULL,
	[Floor] [int] NOT NULL primary key([ArticleID],[Floor]),
	[MemberID] [int] NOT NULL foreign key references [dbo].[Member]([MemberID])  ,	
	[Article] [nvarchar](200) NULL,
	[Time] [datetime] NULL,
	[Image] [varchar](50))

INSERT [dbo].[Blog] ([Title],[SubTitle],[ArticleID],[Floor],[MemberID],[Article],[Time]) VALUES (N'�b�a�ۤw�����Ԧ�Ĭ
',N'���Ʒǳ�',5002,0,10003,'dkjdsfnuidjsddfjsdfusifusjks','2023/1/4 10:40:50')
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

INSERT [dbo].[Schedule] VALUES ('2023/1/4',NULL,120001,'�ⰵ�J�|')
INSERT [dbo].[Schedule] VALUES ('2023/1/5',NULL,120001,'�氮')
INSERT [dbo].[Schedule] VALUES ('2023/1/6',10004,NULL,NULL)
INSERT [dbo].[Schedule] VALUES ('2023/1/7',10003,NULL,NULL)
INSERT [dbo].[Schedule] VALUES ('2023/1/9',NULL,120001,'�ⰵ�J�|')
INSERT [dbo].[Schedule] VALUES ('2023/1/10',10007,NULL,NULL)




CREATE TABLE [dbo].[Product](
	[ProductName] [nvarchar](50) NOT NULL,
	[Specifications] [nvarchar](50) NOT NULL primary key([ProductName],[Specifications]),
	[Price] [int] NULL,
	[ImageName] [nvarchar](150) NULL,
	[Avalible] [bit] default 1)

INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'cheese���', N'�p��', 120,'CheeseStick')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'cheese���', N'�j��', 220,'CheeseStick')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'�i�d�̻�', N'��', 200,'BokaRiceCookie')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'�Q�L������', N'11�J', 300,'almondCookie')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'���V���q�d', N'6�J', 350,'scone')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'�ʭ��i�i�ȤH�J�|', N'5�J', 350,'passionCocoCupCake')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'���J�O�y', N'�����{�{/10�J', 250,'blackChocolate')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'���J�O�y', N'�����w�w/10�J', 300,'redChocolate')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'�ѨϤ��a�i�R�S', N'���i�i/6�J', 450,'canele')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'�ѨϤ��a�i�R�S', N'�g����/6�J', 450,'canele')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'�ѨϤ��a�i�R�S', N'��X/6�J', 450,'canele')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName])VALUES(N'�w��', N'����_�q/6�J', 450,'puffstrawberrycheese')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�w��', N'�B���/6�J', 450,'puffearlgrey')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�w��', N'���󥤪o/6�J', 450,'puffvanilla')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�w��', N'���@�i�i/6�J', 450,'puffchocolate')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�f�c���w��', N'6�J', 270,'lemonMadeleine')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�f�L�f�c��', N'��', 90,'lemonTart')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�s���ݮR�R', N'�p�M��', 140,'TiramisuS')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�s���ݮR�R', N'�j����', 520,'TiramisuL')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�s������', N'�p�M��', 140,'TiramisuS')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�s������', N'�j����', 520,'TiramisuL')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�˼��ŹT', N'5�J', 350,'cheeseCake')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'���J�O���G��', N'��', 150,'chocoberryTart')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�s�{���´˪L', N'�p�M��', 140,'cherryChocoCake')
INSERT [dbo].[Product]([ProductName],[Specifications],[Price],[ImageName]) VALUES(N'�s�{���´˪L', N'�j����', 520,'cherryChocoCake')



CREATE TABLE [dbo].[Order](
	[OrderID] [int] NOT NULL primary key identity(19001,1),
	[BuyerID] [int] NOT NULL foreign key references [dbo].[Member]([MemberID]),
	[ProductName] [nvarchar](50) NOT NULL,
	[Specifications] [nvarchar](50) NOT NULL,
	[Discount] [float] NULL,
	[Income] [float] NULL,
	[Number] [int] NOT NULL default 1,
	foreign key ([ProductName],[Specifications]) references [dbo].[Product]([ProductName],[Specifications]))

INSERT [dbo].[Order] VALUES(10005,N'�ѨϤ��a�i�R�S',N'�g����/6�J',1,450,6)
INSERT [dbo].[Order] VALUES(10007,N'���J�O�y',N'�����{�{/10�J',0.8,200,5)
INSERT [dbo].[Order] VALUES(10003,N'�Q�L������',N'11�J',1,300,2)
INSERT [dbo].[Order] VALUES(10002,N'�s������',N'�j����',1,520,1)
INSERT [dbo].[Order] VALUES(10002,N'�ʭ��i�i�ȤH�J�|',N'5�J',1,350,4)




CREATE TABLE [dbo].[HashTag](
	[ProductName] [nvarchar](50)NOT NULL,
	[Specifications] [nvarchar](50) NOT NULL,
	[HashTag] [nvarchar](50)NOT NULL,
	foreign key ([ProductName],[Specifications]) references [dbo].[Product]([ProductName],[Specifications]),
	primary key ([ProductName],[Specifications],[HashTag]))

INSERT [dbo].[HashTag] VALUES(N'cheese���',N'�j��',N'�_�q')
INSERT [dbo].[HashTag] VALUES(N'cheese���',N'�j��',N'�氮')
INSERT [dbo].[HashTag] VALUES(N'cheese���',N'�j��',N'�����i��')
INSERT [dbo].[HashTag] VALUES(N'cheese���',N'�p��',N'�_�q')
INSERT [dbo].[HashTag] VALUES(N'cheese���',N'�p��',N'�氮')
INSERT [dbo].[HashTag] VALUES(N'cheese���',N'�p��',N'�����i��')

INSERT [dbo].[HashTag] VALUES(N'�ѨϤ��a�i�R�S',N'���i�i/6�J',N'�i�R�S')
INSERT [dbo].[HashTag] VALUES(N'�ѨϤ��a�i�R�S',N'���i�i/6�J',N'�i�i')
INSERT [dbo].[HashTag] VALUES(N'�ѨϤ��a�i�R�S',N'���i�i/6�J',N'���')
INSERT [dbo].[HashTag] VALUES(N'�ѨϤ��a�i�R�S',N'�g����/6�J',N'�i�R�S')
INSERT [dbo].[HashTag] VALUES(N'�ѨϤ��a�i�R�S',N'�g����/6�J',N'����')

INSERT [dbo].[HashTag] VALUES(N'�ѨϤ��a�i�R�S',N'��X/6�J',N'�i�R�S')
INSERT [dbo].[HashTag] VALUES(N'�ѨϤ��a�i�R�S',N'��X/6�J',N'�i�i')
INSERT [dbo].[HashTag] VALUES(N'�ѨϤ��a�i�R�S',N'��X/6�J',N'���')
INSERT [dbo].[HashTag] VALUES(N'�ѨϤ��a�i�R�S',N'��X/6�J',N'����')

INSERT [dbo].[HashTag] VALUES(N'���J�O�y',N'�����w�w/10�J',N'�i�i')
INSERT [dbo].[HashTag] VALUES(N'���J�O�y',N'�����w�w/10�J',N'���J�O')
INSERT [dbo].[HashTag] VALUES(N'���J�O�y',N'�����w�w/10�J',N'�ܤ�')
INSERT [dbo].[HashTag] VALUES(N'���J�O�y',N'�����w�w/10�J',N'���G��')
INSERT [dbo].[HashTag] VALUES(N'���J�O�y',N'�����w�w/10�J',N'���_�ۥ��J�O')

INSERT [dbo].[HashTag] VALUES(N'���J�O�y',N'�����{�{/10�J',N'�i�i')
INSERT [dbo].[HashTag] VALUES(N'���J�O�y',N'�����{�{/10�J',N'���J�O')
INSERT [dbo].[HashTag] VALUES(N'���J�O�y',N'�����{�{/10�J',N'�ܤ�')
INSERT [dbo].[HashTag] VALUES(N'���J�O�y',N'�����{�{/10�J',N'�¥��J�O')
INSERT [dbo].[HashTag] VALUES(N'���J�O�y',N'�����{�{/10�J',N'������')

INSERT [dbo].[HashTag] VALUES(N'���J�O���G��',N'��',N'���J�O')
INSERT [dbo].[HashTag] VALUES(N'���J�O���G��',N'��',N'���G')
INSERT [dbo].[HashTag] VALUES(N'���J�O���G��',N'��',N'��')

INSERT [dbo].[HashTag] VALUES(N'�f�L�f�c��',N'��',N'�f�c')
INSERT [dbo].[HashTag] VALUES(N'�f�L�f�c��',N'��',N'��')

INSERT [dbo].[HashTag] VALUES(N'�f�c���w��',N'6�J',N'�f�c')
INSERT [dbo].[HashTag] VALUES(N'�f�c���w��',N'6�J',N'���w��')

INSERT [dbo].[HashTag] VALUES(N'�w��',N'�B���/6�J',N'�w��')
INSERT [dbo].[HashTag] VALUES(N'�w��',N'�B���/6�J',N'�B��')
INSERT [dbo].[HashTag] VALUES(N'�w��',N'�B���/6�J',N'�t�s')

INSERT [dbo].[HashTag] VALUES(N'�w��',N'����_�q/6�J',N'�w��')
INSERT [dbo].[HashTag] VALUES(N'�w��',N'���@�i�i/6�J',N'���')

INSERT [dbo].[HashTag] VALUES(N'�i�d�̻�',N'��',N'�_�_')
INSERT [dbo].[HashTag] VALUES(N'�i�d�̻�',N'��',N'�̻�')
INSERT [dbo].[HashTag] VALUES(N'�i�d�̻�',N'��',N'�氮')
INSERT [dbo].[HashTag] VALUES(N'�i�d�̻�',N'��',N'�����i��')

INSERT [dbo].[HashTag] VALUES(N'�ʭ��i�i�ȤH�J�|',N'5�J',N'�i�i')
INSERT [dbo].[HashTag] VALUES(N'�ʭ��i�i�ȤH�J�|',N'5�J',N'���J�O')
INSERT [dbo].[HashTag] VALUES(N'�ʭ��i�i�ȤH�J�|',N'5�J',N'�ʭ��G')
INSERT [dbo].[HashTag] VALUES(N'�ʭ��i�i�ȤH�J�|',N'5�J',N'�M�l�J�|')

INSERT [dbo].[HashTag] VALUES(N'�Q�L������',N'11�J',N'����')
INSERT [dbo].[HashTag] VALUES(N'�Q�L������',N'11�J',N'�氮')

INSERT [dbo].[HashTag] VALUES(N'���V���q�d',N'6�J',N'���V��')
INSERT [dbo].[HashTag] VALUES(N'���V���q�d',N'6�J',N'�q�d')

INSERT [dbo].[HashTag] VALUES(N'�˼��ŹT',N'5�J',N'�ŹT')
INSERT [dbo].[HashTag] VALUES(N'�˼��ŹT',N'5�J',N'�ŹT�J�|')

INSERT [dbo].[HashTag] VALUES(N'�s�{���´˪L',N'�j����',N'�s�{')
INSERT [dbo].[HashTag] VALUES(N'�s�{���´˪L',N'�j����',N'���')
INSERT [dbo].[HashTag] VALUES(N'�s�{���´˪L',N'�j����',N'�´˪L')
INSERT [dbo].[HashTag] VALUES(N'�s�{���´˪L',N'�j����',N'���J�O')
INSERT [dbo].[HashTag] VALUES(N'�s�{���´˪L',N'�j����',N'���Ԧ�Ĭ')

INSERT [dbo].[HashTag] VALUES(N'�s�{���´˪L',N'�p�M��',N'�s�{')
INSERT [dbo].[HashTag] VALUES(N'�s�{���´˪L',N'�p�M��',N'���')
INSERT [dbo].[HashTag] VALUES(N'�s�{���´˪L',N'�p�M��',N'�´˪L')
INSERT [dbo].[HashTag] VALUES(N'�s�{���´˪L',N'�p�M��',N'���J�O')
INSERT [dbo].[HashTag] VALUES(N'�s�{���´˪L',N'�p�M��',N'���Ԧ�Ĭ')

INSERT [dbo].[HashTag] VALUES(N'�s������',N'�j����',N'���Ԧ�Ĭ')
INSERT [dbo].[HashTag] VALUES(N'�s������',N'�j����',N'�t�s')

INSERT [dbo].[HashTag] VALUES(N'�s������',N'�p�M��',N'���Ԧ�Ĭ')
INSERT [dbo].[HashTag] VALUES(N'�s������',N'�p�M��',N'�t�s')

INSERT [dbo].[HashTag] VALUES(N'�s���ݮR�R',N'�j����',N'����')
INSERT [dbo].[HashTag] VALUES(N'�s���ݮR�R',N'�j����',N'���Ԧ�Ĭ')
INSERT [dbo].[HashTag] VALUES(N'�s���ݮR�R',N'�j����',N'�t�s')

INSERT [dbo].[HashTag] VALUES(N'�s���ݮR�R',N'�p�M��',N'����')
INSERT [dbo].[HashTag] VALUES(N'�s���ݮR�R',N'�p�M��',N'���Ԧ�Ĭ')
INSERT [dbo].[HashTag] VALUES(N'�s���ݮR�R',N'�p�M��',N'�t�s')
