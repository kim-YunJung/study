import React from "react";
import { useState } from "react";

/**
수정페이지를 구성하기 위해 기존의 데이터를 Props로 전달받아 <input>
태그의 value속성값으로 설정한다. 
하지만 이 경우 <input>이 readonly속성으로 렌더링되어 기존의 내용을 
수정할 수 없게된다. 
React에서 Props는 외부에서 내부로 전달되는 일종의 파라미터이므로 
애초에 '읽기전용'으로 설정되어 있기 때문이다.  

위와 같은 문제로 Props를 State에 저장한 후 onChange 이벤트 핸들러를 
통해 설정된 내용을 수정할 수 있도록 변경해야한다. 
 */
function ArticleEdit(props){

	/** <input>태그의 갯수만큼 State를 생성한다. Props로 전달된 데이터를
	각 State에 저장한 후 변환함수까지 설정한다. 
	이렇게 하면 Props는 그 값을 동일하게 유지하게되고, 복사본인 State만 
	변경되는 구조가된다. 
	 */
	const [title, setTitle] = useState(props.selectRow.title);
	const [writer, setWriter] = useState(props.selectRow.writer);
	const [contents, setContents] = useState(props.selectRow.contents);
	
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
							{/* value 속성값은 State로 저장된 값을 설정한다. 해당 input에서 발생되는 이벤트를 통해 입력값을 변경한다.  */}
							<th>작성자</th>
							<td><input type='text' name="writer" 
										value={writer} 
										onChange={(event)=>{
											setWriter(event.target.value);
										}} 
									/></td>
					</tr>
					<tr>
							<th>제목</th>
							<td><input type='text' name="title" 
											value={title} onChange={(event)=>{
													setTitle(event.target.value);
											}} /></td>
					</tr>
					<tr>
							{/* HTML에서 <textarea>태그는 태그 사이에 값을 설정하지만, React에서는 <input>과 동일하게 value속성을 사용한다.  */}
							<th>내용</th>
							<td><textarea name="contents" cols='22' rows='3'
									value={contents}
									onChange={(event)=>{
											setContents(event.target.value);
									}}></textarea></td>
					</tr>
					</tbody>
				</table>
				<input type="submit" value="수정하기"></input>
			</form>
		</article>
	);
}

export default ArticleEdit;



