import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());//app start
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(//materia 테마의 위젯
      title: 'Flutter Demo'
      , theme: ThemeData(
        primaryColor: Colors.white
      ),
      home: MyHome(),
    );
  }
}

class MyHome extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(//앱을 상중하로 나눠준다.
        appBar: AppBar(//상단을 의미
          title : Text('title')//텍스트 추가
        ),
        body : ColoredBox(//중을 의미
          color: Colors.blue,

          child: 
            Row(//여러 위젯을 가로로 배치할 때 사용
              children: <Widget>[
                Container(
                  color: Colors.yellow,
                  width: 100,//사이즈 단위 lp
                  height: 100,
                ),

                Container(
                  color: Colors.red,
                  width: 100,
                  height: 100,
                  child: Center(
                    child: Icon(Icons.star, color: Colors.amber,),//아이콘 추가
                  )
                ),

                Container(
                  color: Colors.purple,
                  width: 100,
                  height: 100,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,//가로 정렬을 변경한다.
                    children: [
                      Icon(Icons.star_border_outlined)
                      , Icon(Icons.star)
                      , Icon(Icons.star_border_outlined)
                    ],
                  )
                ),

                Container(
                  color: Colors.green,
                  width: 100,
                  height: 100,
                  child: Column(//세로로 배치
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,//column의 메인축(세로)이기에 세로 정렬
                    crossAxisAlignment: CrossAxisAlignment.center,//반대축(가로)이므로 가로 정렬
                    children: [
                      Icon(Icons.star_border_outlined)
                      , Icon(Icons.star)
                      , Icon(Icons.star_border_outlined)
                    ],
                  )
                ),

                Container(//박스 생성
                  color: Colors.white,
                  width: 100,
                  height: 100,
                  child: Align(//정렬
                    alignment: Alignment.center,
                    child: Image.asset(//이미지 추가
                      'assets/images/plave.jpg',
                      width: 90,
                      height: 90,
                    ),
                  )
                ),
              
              Container(
                  width: 100,
                  height: 100,
                  margin: EdgeInsets.all(10),
                  //margin: EdgeInsets.fromLTRB(left, top, right, bottom)
                  padding: EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.black)
                    /* width : double.infinity - 무한을 의미 부모 사이즈보다 커질 순 없다.
                    
                    border에 색상을 준 경우 Container color: Colors.white를 별도로 지정할 경우
                    오류가 발생한다. */
                  ),
                  child: Text('1234'
                      , style: TextStyle(
                          color: Colors.white
                          , fontSize: 24
                          , fontWeight: FontWeight.w300
                        ),
                    ),
                ),

                Container(
                  child: TextButton(onPressed: (){}
                    , child: Text('data')),
                  ),

                  Container(
                  child: ElevatedButton(onPressed: (){}
                    , child: Text('data')),
                  ),
              ],


            ),

        ), 

        bottomNavigationBar: BottomAppBar(
          child: 
            //Container(), 아래의 설정보다 많은 설정을 할 경우 사용한다.
            SizedBox(
              height: 100,
            )//가로, 세로, child만 사용할 경우 사용한다. Container보다 가볍다.
        ),//하를 의미
    );
  }

}