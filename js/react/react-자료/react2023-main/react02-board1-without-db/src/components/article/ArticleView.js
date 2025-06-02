import React from "react";

//읽기 
function ArticleView(props){
  //선택된 객체가 콘솔에 출력 
  console.log("선택한게시물:", props.selectRow);

  //객체의 Key를 통해 적절히 출력한다. 
	return (
	<article>
    <table id="boardTable">
      <colgroup>
        <col width="20%" /><col width="*" />
      </colgroup>
      <tbody>
        <tr>
          <th>작성자</th>
          <td>{props.selectRow.writer}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td>{props.selectRow.title}</td>
        </tr>
        <tr>
          <th>날짜</th>
          <td>{props.selectRow.date}</td>
        </tr>
        <tr>
          <th>내용</th>
          <td>{props.selectRow.contents}</td>
        </tr>
        <tr>
          <th>내용1</th>
          {/* JS의 고차함수인 map()을 이용해서 줄바꿈이 된 횟수만큼
          반복해서 <br>태그로 변경한다.  */}
          <td>{
            props.selectRow.contents.split('\n').map((currVal)=>{
              console.log(currVal);
              return (<>
                {currVal} <br key={Math.random()} />
              </>);
            })						
          }</td>
        </tr>
        {/* CSS의 white-space속성을 적용해서 줄바꿈 처리한다. */}
        <tr>
          <th>내용2</th>
          <td style={{'whiteSpace':'pre-wrap'}}>
            {props.selectRow.contents}
          </td>
        </tr>
        <tr>
          <th>내용3</th>
          <td className="contWrap">{props.selectRow.contents}</td>
        </tr>
      </tbody>
    </table> 
  </article>
	);
}

export default ArticleView;  