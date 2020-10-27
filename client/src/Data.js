import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        //comes from apiBaseUrl property of config.js
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }

    /*
    makes GET users call to the backend
     */
    async getUser(emailAddress, password) {
        console.log("signing in... " + emailAddress + ", " + password);
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200 || response.status === 201) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    /*
    makes POST call to the backend to create a new user
     */
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            console.log("response createUser " + response.json.length);
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    /*
    makes GET courses call to the backend
    */
    async getCourses() {
        const response = await this.api("/courses", "GET");
        if (response.status === 200) {
            const courses = await response.json().then((data) => data);
            return courses;
        } else if (response.status === 401) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    /*
    makes GET call to the backend for retrieving a course with the specified ID
    */
    async detCourseDetails(id){
        const response = await this.api(`/courses/${id}`, "GET");
        if (response.status === 200) {
            const course = await response.json().then((data) => data);
            console.log(course);
            return course;
        } else if (response.status === 401) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    /*
    makes DELETE call to the backend to delete a course with the specified ID
     */
    async deleteCourse(id, emailAddress, password){
        const response = await this.api(`/courses/${id}`, "DELETE",null, true, { emailAddress, password });
        if (response.status === 204) {
            return [];
        } else if (response.status === 401) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    /*
    makes PUT call to the backend for updating a course with the specified ID
    */
    async updateCourse(courseId, updatedCourse, emailAddress, password){
        const response = await this.api(`/courses/${courseId}`, 'PUT', updatedCourse, true,{ emailAddress, password });
        if (response.status === 204) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    /*
    makes POST call to the backend to create a new course
    */
    async createCourse(course, emailAddress, password){
        const response = await this.api('/courses', 'POST', course, true,{ emailAddress, password });
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }
}
