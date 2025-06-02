import 'package:flutter/material.dart';
import 'package:plave_test/model/model_movie.dart';
import 'package:plave_test/widget/box_slider.dart';
import 'package:plave_test/widget/carousel_slider.dart';
import 'package:plave_test/widget/circle_slider.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Movie> movies = [
    Movie.fromMap({
      'title' : '한노아 ',
      'keyword' : '공주 / 말랑 뿅아리 / 나비 / 명창 알파카',
      'poster' : 'assets/images/noah/plave_p.gif',
      'like' : false
    }),
    
    Movie.fromMap({
      'title' : '남예준',
      'keyword' : '1등 신랑감 / 예덩이 / 도베르만두 / 레드아이즈',
      'poster' : 'assets/images/yejun/plave_p.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '채밤비',
      'keyword' : '시복 / 천년돌 / 뵥뵥이 / 핑크쪼꼬미',
       'poster' : 'assets/images/bamby/plave_p.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '도은호',
      'keyword' : '실버호 / 가나디 / 늑대 / 도으노',
      'poster' : 'assets/images/eunho/plave_p.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '유하민',
      'keyword' : '함니 / 빛하민 / 하미니 / 방가방가캣',
      'poster' : 'assets/images/hamin/plave_p.gif',
      'like' : false
    }),
    
  ];

  List<Movie> movies2 = [
    Movie.fromMap({
      'title' : '한노아 ',
      'keyword' : '공주 / 말랑 뿅아리 / 나비 / 명창 알파카',
      'poster' : 'assets/images/noah/plave_fancam.gif',
      'like' : false
    }),
    
    Movie.fromMap({
      'title' : '남예준',
      'keyword' : '1등 신랑감 / 예덩이 / 도베르만두 / 레드아이즈',
      'poster' : 'assets/images/yejun/plave_fancam.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '채밤비',
      'keyword' : '시복 / 천년돌 / 뵥뵥이 / 핑크쪼꼬미',
       'poster' : 'assets/images/bamby/plave_fancam.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '도은호',
      'keyword' : '실버호 / 가나디 / 늑대 / 도으노',
      'poster' : 'assets/images/eunho/plave_fancam.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '유하민',
      'keyword' : '함니 / 빛하민 / 하미니 / 방가방가캣',
      'poster' : 'assets/images/hamin/plave_fancam.gif',
      'like' : false
    }),
    
  ];

  List<Movie> movies3 = [
    Movie.fromMap({
      'title' : '맏형즈',
      'keyword' : '노파민즈',
      'poster' : 'assets/images/line/youngest_members/plave_line.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '베리즈',
      'keyword' : '',
       'poster' : 'assets/images/line/berries/plave_line.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '댕댕즈',
      'keyword' : '',
      'poster' : 'assets/images/line/puppies/prave_line.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '예라인',
      'keyword' : '',
      'poster' : 'assets/images/line/ye_line/plave_line.gif',
      'like' : false
    }),
    
    Movie.fromMap({
      'title' : '쁜라인',
      'keyword' : '',
      'poster' : 'assets/images/line/cood_line/plave_line.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '노라인',
      'keyword' : '',
      'poster' : 'assets/images/line/no_line/plave_line.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '냥냥즈',
      'keyword' : '',
      'poster' : 'assets/images/line/meow/plave_line.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '야타즈',
      'keyword' : '',
      'poster' : 'assets/images/line/yatazu/plave_line4.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '댄라즈',
      'keyword' : '',
      'poster' : 'assets/images/line/danlaz/plave_line3.gif',
      'like' : false
    }),

    Movie.fromMap({
      'title' : '래퍼즈',
      'keyword' : '막내즈',
      'poster' : 'assets/images/line/puppy_cats/plave_line.gif',
      'like' : false
    }),
    
    Movie.fromMap({
      'title' : '작곡즈',
      'keyword' : '',
      'poster' : 'assets/images/line/composers/plave_line.jpg',
      'like' : false
    }),
  ];

  @override
  void initState() { 
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return ListView(children: <Widget>[
      Stack(
        children: <Widget>[
          CarouselImage(movies),
          TopBar(),
        ],),

        CircleSlider(movies2,),
        BoxSlider(movies3,),
      ],
    );
  }
}

class TopBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(

      padding: EdgeInsets.fromLTRB(20, 7, 20, 7),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Image.asset(
            'assets/images/plave.png', 
            fit: BoxFit.contain, 
            height: 25,
          ),

          Container(
            padding: EdgeInsets.only(right: 1),
            child: Text(
              '멤버',
              style: TextStyle(fontSize: 14),
            ),
          ),

          Container(
            padding: EdgeInsets.only(right: 1),
            child: Text(
              '멤버 간 케미',
              style: TextStyle(fontSize: 14),
            ),
          ),

          Container(
            padding: EdgeInsets.only(right: 1),
            child: Text(
              '좋아요',
              style: TextStyle(fontSize: 14),
            ),
          ),
        ],

      ),

    );

  }

}