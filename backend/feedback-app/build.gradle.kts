import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "3.0.5"
	id("io.spring.dependency-management") version "1.1.0"
	kotlin("jvm") version "1.7.22"
	kotlin("plugin.spring") version "1.7.22"
	kotlin("plugin.jpa") version "1.7.22"
}
group = "com.example"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
	mavenCentral()
}

dependencies {
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.14.2")
	implementation("io.projectreactor.kotlin:reactor-kotlin-extensions:1.2.2")
	implementation("org.jetbrains.kotlin:kotlin-reflect:1.8.10")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor:1.6.4")
	implementation("org.springframework.boot:spring-boot:3.0.4")
	implementation("org.springframework.boot:spring-boot-starter-web:3.0.4")
	implementation("com.navercorp.spring:spring-jdbc-plus-support:3.0.1")
	implementation("org.springframework:spring-jdbc:6.0.6")
	implementation("org.springframework:spring-core:6.0.6")
	implementation("org.springframework:spring-context:6.0.6")
	implementation("org.springframework.boot:spring-boot-starter-data-jdbc:3.0.4")
	runtimeOnly("org.postgresql:postgresql:42.5.4")
	testImplementation("org.springframework.boot:spring-boot-starter-test:3.0.4")
	testImplementation("io.projectreactor:reactor-test:3.5.4")

}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
