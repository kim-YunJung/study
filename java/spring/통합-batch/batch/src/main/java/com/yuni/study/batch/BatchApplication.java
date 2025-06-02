package com.yuni.study.batch;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.*;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

//배치 등록을 위한
@EnableBatchProcessing
@SpringBootApplication
public class BatchApplication {

	//배치 잡을 생성을 위한 빌더
	private JobBuilderFactory jobBuilderFactory;

	//배치 스탭을 생성을 위한 빌더
	private StepBuilderFactory stepBuilderFactory;

	public BatchApplication(JobBuilderFactory jobBuilderFactory, StepBuilderFactory stepBuilderFactory) {
		this.jobBuilderFactory = jobBuilderFactory;
		this.stepBuilderFactory = stepBuilderFactory;
	}

	//스탭
	@Bean
	public Step passStep(){
		return this.stepBuilderFactory.get("passStep")
				.tasklet((contribution, chunkContext) -> {
					System.out.println("passStep");
					//종료
					return RepeatStatus.FINISHED;
				}).build();
	}

	//잡
	@Bean
	public Job passJob(){
		return this.jobBuilderFactory.get("passJob")
				.start(passStep())
				.build();
	}

	public static void main(String[] args) {
		SpringApplication.run(BatchApplication.class, args);
	}

}
