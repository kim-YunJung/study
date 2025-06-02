import React from "react";

function ArticleWrite(props){
	return (
	<article>
		<form>
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