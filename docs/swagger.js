const apiDocs = {
    "definition":{
        "openapi": "3.0.3",
        "info": {
            "title": "DreamHome",
            "description": "API Documentation for DreamHome RESTful API",
            "version": "1",
            "contact": {
                "name": "M Awaludin",
                "email": "am.awaludinmuhammad@gmail.com"
            }
        },
        "servers": [
            {
                "url": "http://{environment}/api/v1",
                "variables": {
                    "environment": {
                        "default": "localhost:3000",
                        "enum": [
                            "localhost:3000",
                            "dev",
                            "prod"
                        ]
                    }
                }
            }
        ],
        "tags": [
            {
                "name": "category",
                "description": "Operation about category"
            },
            {
                "name": "certificate",
                "description": "Operation about certificate"
            }
        ],
        "paths": {
            "/categories": {
                "post": {
                    "tags": ["category"],
                    "summary": "Add new category",
                    "description": "Add new category",
                    "consumes": "multipart/form-data",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "multipart/form-data": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "type": "string"
                                        },
                                        "thumbnail": {
                                            "type": "file"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Created category",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "integer"
                                                    },
                                                    "slug": {
                                                        "type": "string"
                                                    },
                                                    "name": {
                                                        "type": "string"
                                                    },
                                                    "thumbnail": {
                                                        "type": "string"
                                                    },
                                                    "active": {
                                                        "type": "boolean"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "get": {
                    "tags": ["category"],
                    "summary": "Fetch all categories",
                    "description": "Fetch all categories",
                    "responses": {
                        "200": {
                            "description": "List of available categories",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "data": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "type": "integer"
                                                        },
                                                        "slug": {
                                                            "type": "string"
                                                        },
                                                        "name": {
                                                            "type": "string"
                                                        },
                                                        "thumbnail": {
                                                            "type": "string"
                                                        },
                                                        "active": {
                                                            "type": "boolean"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/categories/{id}": {
                "get": {
                    "tags": ["category"],
                    "summary": "Find single category",
                    "description": "Find single category",
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "Category id",
                            "schema": {
                                "type": "integer"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Category",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "integer"
                                                    },
                                                    "slug": {
                                                        "type": "string"
                                                    },
                                                    "name": {
                                                        "type": "string"
                                                    },
                                                    "thumbnail": {
                                                        "type": "string"
                                                    },
                                                    "active": {
                                                        "type": "boolean"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "put": {
                    "tags": ["category"],
                    "summary": "Update single category",
                    "description": "Update single category",
                    "consumes": "multipart/form-data",
                    "parameters": [
                        {
                            "in": "path",
                            "name": "id",
                            "required": true,
                            "schema": {
                                "type": "integer"
                            }
                        }
                    ],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "multipart/form-data": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "type": "string"
                                        },
                                        "thumbnail": {
                                            "type": "file"
                                        },
                                        "active": {
                                            "type": "boolean"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Updated category",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "integer"
                                                    },
                                                    "slug": {
                                                        "type": "string"
                                                    },
                                                    "name": {
                                                        "type": "string"
                                                    },
                                                    "thumbnail": {
                                                        "type": "string"
                                                    },
                                                    "active": {
                                                        "type": "boolean"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "delete": {
                    "tags": ["category"],
                    "summary": "Delete category",
                    "description": "Delete category",
                    "parameters": [
                        {
                            "in": "path",
                            "name": "id",
                            "required": true,
                            "schema": {
                                "type": "integer"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Deleted category",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "data": {
                                                "type": "object",
                                                "properties": {}
                                            },
                                            "message": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/certificates": {
                "post": {
                    "tags": ["certificate"],
                    "summary": "Add new certificate",
                    "description": "Add new certificate",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Created certificate",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "integer"
                                                    },
                                                    "name": {
                                                        "type": "string"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "get": {
                    "tags": ["certificate"],
                    "summary": "Fetch all certificates",
                    "description": "Fetch all certificates",
                    "responses": {
                        "200": {
                            "description": "List of available certificates",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "data": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "type": "integer"
                                                        },
                                                        "name": {
                                                            "type": "string"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "apis": ["../../routes/*.js"]
}

export default apiDocs