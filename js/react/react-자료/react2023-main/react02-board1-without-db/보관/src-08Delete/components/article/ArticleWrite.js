import React from "react";

function ArticleWrite(props){
	return (
	<article>
		<form onSubmit={(event)=>{
			//폼값이 submit되지 않도록 차단 
			event.preventDefault();

			//event객체의 target속성으로 <input>태그의 DOM에 접근한 후 
			//입력값을 얻어온다. 
			let title = event.target.title.value;
			let writer = event.target.writer.value;
			let contents = event.target.contents.value;

			//부모 컴포넌트에서 Props로 전달해준 함수를 호출하여 부모로 데이터 전달
			props.writeAction(title, writer, contents);
		}}>
			<table id="boardTable">
				<tbody>
					<tr>
							<th>작성자</th>
							<td><input type='text' name="writer" /></td>
					</tr>
					<tr>
							<th>제목</th>
							<td><input type='text' name="title" /></td>
					</tr>
					<tr>
							<th>내용</th>
							<td><textarea name="contents" rows='3'></textarea></td>
					</tr>
				</tbody>
			</table>
			<input type="submit" value="전송"></input>
		</form>
	</article> 
	);
}

export default ArticleWrite;