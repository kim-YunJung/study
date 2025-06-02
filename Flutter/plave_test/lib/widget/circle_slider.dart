import 'package:flutter/material.dart';
import 'package:plave_test/model/model_movie.dart';
import 'package:plave_test/screen/detail_screen.dart';

class CircleSlider extends StatelessWidget {
  final List<Movie> movies;

  CircleSlider(this.movies);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(7),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text('멤버'),
          Container(
            height: 120,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: makeCircleImages(context, movies),
            ),
          )
        ],
      ),
    );
  }
}

List<Widget> makeCircleImages(BuildContext context, List<Movie> movies){
  List<Widget> results = [];

  for(var i = 0; i < movies.length; i++){
    results.add(
      InkWell(
        onTap: (){
          Navigator.of(context).push(
            MaterialPageRoute(
              fullscreenDialog: true,
              builder: (context) => DetailScreen(movies[i])
            ),                            
          );
        },
        child: Container(
          padding: EdgeInsets.only(right: 10),
          child: Align(
            alignment: Alignment.centerLeft,
            child: CircleAvatar(
              backgroundImage: AssetImage(movies[i].poster),
              radius: 48,
            ),
          ),
        ),
      )
    );
  }    
  
  return results;
}