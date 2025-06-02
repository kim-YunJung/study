import React from "react";

/**
수정페이지를 구성하기 위해 기존의 데이터를 Props로 전달받아 <input>
태그의 value속성값으로 설정한다. 
하지만 이 경우 <input>이 readonly속성으로 렌더링되어 기존의 내용을 
수정할 수 없게된다. 
React에서 Props는 외부에서 내부로 전달되는 일종의 파라미터이므로 
애초에 '읽기전용'으로 설정되어 있기 때문이다.  
 */
function ArticleEdit(props){
	return (
		<article>
			<form onSubmit={(event)=>{
					event.preventDefault();
					//이벤트객체를 통해 폼값을 저장
					let title = event.target.title.value;
					let writer = event.target.writer.value;
					let contents = event.target.contents.value;
					//console.log('ArticleEdit컴포', title, writer, contents);

					//부모 컴포넌트로 입력값 전달 
					props.editAction(title, writer, contents);
			}}>
				<table id="boardTable">
					<tbody>
						<tr>
							<th>작성자</th>
							<td><input type='text' name="writer" 
											value={props.selectRow.writer} /></td>
						</tr>
						<tr>
							<th>제목</th>
							<td><input type='text' name="title" 
											value={props.selectRow.title} /></td>
						</tr>
						<tr>
							<th>내용</th>
							{/* HTML에서는 <textarea>태그에 value속성을 사용하지 않지만
							JSX에서는 <input>과 동일하게 이 속성을 사용해서 기존값을
							설정한다.  */}
							<td><textarea name="contents" rows='3'
									value={props.selectRow.contents}></textarea></td>
						</tr>
					</tbody>
				</table>
				<input type="submit" value="수정하기"></input>
			</form>
		</article>
	);
}

export default ArticleEdit;



